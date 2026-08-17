import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!GOOGLE_APPLICATION_CREDENTIALS) {
      return NextResponse.json(
        { error: 'Server not configured: set GOOGLE_APPLICATION_CREDENTIALS.' },
        { status: 500 }
      );
    }

    const decodedCredentials = JSON.parse(
      Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf8')
    );

    const auth = new GoogleAuth({
      credentials: decodedCredentials,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // 2. Define the REST API Endpoint
    // Replace with your actual Project ID and Location (e.g., 'us' or 'global')
    const PROJECT_ID = process.env.PROJECT_ID; 
    const LOCATION = process.env.LOCATION; 
    const AGENT_ID = process.env.AGENT_ID;
    const AGENT_LOCATION = process.env.AGENT_LOCATION;

    if (!PROJECT_ID || !LOCATION || !AGENT_ID) {
      return NextResponse.json(
        { error: 'Server not configured: set PROJECT_ID, LOCATION, and AGENT_ID.' },
        { status: 500 }
      );
    }

    // const url = `https://geminidataanalytics.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}:chat`;


    // const parent = `projects/${PROJECT_ID}/locations/${LOCATION}/dataAgents/${AGENT_ID}`;

    // const chatRequestBody = {
    //   parent,
    //   messages: [{ user_message: { text: question } }],
    // };

    const url = `https://geminidataanalytics.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}:chat`;

    // The parent is just the location
    const parent = `projects/${PROJECT_ID}/locations/${LOCATION}`;

    // The agent path requires the specific agent location
    const agentPath = `projects/${PROJECT_ID}/locations/${AGENT_LOCATION}/dataAgents/${AGENT_ID}`;

    // Construct the payload using camelCase
    const createConvoUrl = `https://geminidataanalytics.googleapis.com/v1/${parent}/conversations`;
    
    const convoResponse = await fetch(createConvoUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agents: [agentPath]
      })
    });

    if (!convoResponse.ok) {
      const errorText = await convoResponse.text();
      throw new Error(`Failed to create conversation: ${convoResponse.status} - ${errorText}`);
    }

    const convoData = await convoResponse.json();
    // This will be formatted as "projects/.../locations/.../conversations/uuid"
    const conversationName = convoData.name; 

    // ============================================================================
    // STEP 2: Send the Chat Request
    // ============================================================================
    const chatUrl = `https://geminidataanalytics.googleapis.com/v1/${parent}:chat`;

    const chatRequestBody = {
      parent: parent,
      messages: [
        {
          userMessage: { text: question }
        }
      ],
      conversationReference: {
        conversation: conversationName, // <-- Providing the valid resource name here fixes the 400 error
        dataAgentContext: {
          dataAgent: agentPath
        }
      }
    };

    const chatResponse = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRequestBody),
    });

    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      throw new Error(`GCP API Chat Error ${chatResponse.status}: ${errorText}`);
    }

    // 5. Parse the Response 
    // The REST API usually returns an array of message chunks
    const data = await chatResponse.json(); 
    
    let finalAnswerParts = [];
    const chunks = Array.isArray(data) ? data : [data];

    // 6. Filter for the FINAL_RESPONSE, exactly like we did in Python
    for (const chunk of chunks) {
      const sysMsg = chunk.systemMessage;
      
      if (sysMsg && sysMsg.text) {
        // In REST JSON, enums might be strings ("FINAL_RESPONSE") or integers (2)
        if (sysMsg.text.textType === 'FINAL_RESPONSE' || sysMsg.text.textType === 2) {
          if (sysMsg.text.parts) {
            finalAnswerParts.push(...sysMsg.text.parts);
          }
        }
      }
    }

    // Join the parts and return to your frontend
    const finalAnswer = finalAnswerParts.join('\n\n');
    return NextResponse.json({ answer: finalAnswer });

  } catch (error) {
    console.error('Chat API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answer from Agent.' }, 
      { status: 500 }
    );
  }
}