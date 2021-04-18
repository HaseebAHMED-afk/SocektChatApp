import React, { useState } from 'react'

import { ApolloClient , InMemoryCache , ApolloProvider , gql , useQuery , useMutation} from '@apollo/client'
import { Alert ,Button , FormControl , Container , Row , Col } from 'react-bootstrap'


const client = new ApolloClient({
    uri:'http://localhost:4000/',
    cache: new InMemoryCache()
})


const GET_MESSAGES = gql `
    query{
  messages{
    id
    user
    content
  }
}`;

const POST_MESSAGE = gql `
    mutation($user: String! , $content: String!){
        postMessage(user: $user , content: $content)
    }
`

const Messages = ({user}) =>{
    const { data } = useQuery(GET_MESSAGES)
    if(!data){
        return null
    }

    return (
        <div style={{width:'75%' , margin:'auto'}} >
            {data.messages.map(({id , user: messageUser , content} , i)=>(
                <div style={{display: 'flex', justifyContent: user === messageUser ? 'flex-end' :'flex-start' , paddingBottom:'1em'}} >
                     <Alert  variant={ user !== messageUser ? 'success' : 'danger'} style={{borderRadius:'1em'}} >
                        {content}
                    </Alert>
                    {
                        user === messageUser && (
                            <div 
                            key={i}
                                style={{
                                    height:50,
                                    width: 50,
                                    marginRight:'0.5em',
                                    border:'2px solid black',
                                    borderRadius:25,
                                    textAlign:'center',
                                    fontSize:'18pt',
                                    paddingTop:5,
                                    marginLeft:25
                                }}
                            >
                                {messageUser.slice(0,2).toUpperCase()}
                            </div>
                        )
                    }
                   
                    
                </div>
            ))}
        </div>
    )
}


const Chat = () => {

    let [msg , setMsg] = useState({
        user: 'Haseeb',
        content: ''
    })


    const onSend = () =>{
        if(msg.content.length > 0){
            postMessage({
                variables: msg
            })
        }

        setMsg({
            ...msg,
            content:''
        })
    }

    const [postMessage] = useMutation(POST_MESSAGE);


    return (
        <div>
           <Messages user={msg.user} />
           <Container>
           <Row>
                <Col xs={2} >
                    <FormControl
                        aria-label='User'
                        value={msg.user}
                        onChange={(e)=>{setMsg({
                            ...msg,
                            user: e.target.value
                        })}}
                    />
                </Col>
                <Col xs={8} >
                    <FormControl
                        aria-label='User'
                        value={msg.content}
                        onChange={(e)=>{setMsg({
                            ...msg,
                            content: e.target.value
                        })}}
                        onKeyUp={(evt) => {
                            if(evt.keyCode === 13){
                                onSend()
                            }
                        }}
                    />
                </Col>
                <Col xs={2} >
                    <Button variant='success' onClick={() => onSend()} >Send</Button>
                </Col>
            </Row>
           </Container>
            
        </div>
    )
}

export default () =>{

    return(
        <ApolloProvider client={client} >
        <Chat />
    </ApolloProvider>
    )
   
}
