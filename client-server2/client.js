
var net = require('net');
const chalk = require('chalk');
const debug1=require('debug');
const log=debug1('ios')
const { Socket } = require('dgram');
var inquirer = require('inquirer');
const{argv}=require('process')
//var sender_name=argv[2];

var client = new net.Socket();

client.connect(process.env.PORT, process.env.HOST , function() {
   
    console.log('Connected');
    //client.write(JSON.stringify({"sender":sender_name ,"action":"hello-client"}))
    process.stdout.write('>');
});

client.on('data', function(data) {
    log('Received: ' + `${data}`)

});

process.stdin.resume();
process.stdin.setEncoding('utf8');
//process.stdout.write('>');
  inquirer.prompt([
    
    {
        type :'list',
        message:'quelles actions voulez vous mener?',
        name: 'typess',
        choices:["cg","j","bg","members","messages","list","leave","invite","kick","ban","states","prive"]
    },
    {
      type:'input',
      message:'votre nom?',
      name:"sender_name",
    }
  ]).then(answers=>{
      if (answers.typess=='cg'){

        inquirer.prompt([
    
          {
              type :'checkbox',
              message:'quel type de groupe voulez vous creer?',
              name: 'typegroup',
              choices:["groupe privee","groupe public"],
          },
          {
            type:'input',
            message:'okay,donnez un nom au groupe que vous voulez creer?',
            name:"group_name",
          },
        ]).then(gtype=>{
 
        client.write(JSON.stringify({"sender": answers.sender_name, "group": gtype.group_name ,"action":'cgroupe',"typeg":gtype.typegroup}))

                
          })

      }
       //////joindre un groupe 

      if (answers.typess=="j"){

        inquirer.prompt([
    
          {
            type:'input',
            message:'Quel groupe voulez vous integrer?',
            name:"group_name",
          },
        ]).then(joindre=>{
        client.write(JSON.stringify({"sender": `${answers.sender_name }`, "group": `${joindre.group_name}`,"action":'join'}))
      }) 
    }
///les membres d'un groupes
    if (answers.typess=="members"){

      inquirer.prompt([
    
        {
          type:'input',
          message:'le nom du groupe please?',
          name:"group_name",
        },
      ]).then(membres=>{
      client.write(JSON.stringify({"sender": `${answers.sender_name }`,"group": `${membres.group_name}`, "action":'members'}))
      })
    }
///messages echang??s 
    if (answers.typess=="messages"){

      inquirer.prompt([
    
        {
          type:'input',
          message:'De quel groupe please?',
          name:"group_name",
        },
      ]).then(message=>{
      client.write(JSON.stringify({"sender": `${answers.sender_name }`,"group": `${message.group_name}`, "action":'messages'}))
      })

    }
    ///la liste des personnes du groupes 
    if (answers.typess=="list"){

      inquirer.prompt([
    
        {
          type:'input',
          message:'le nom du groupe please?',
          name:"group_name",
        },
      ]).then(listes=>{

    client.write(JSON.stringify({"sender": `${answers.sender_name }`, "action":'list',"group": `${messsage.group_name }`}))
      
      })
    }

    ///envoi de messsage broadcast
    if (answers.typess=="bg"){
      inquirer.prompt([
      {
        type:'input',
        message:'le nom du groupe please?',
        name:"group_name",
      },
    ]).then(broadcast=>{


          const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          readline.on('line',(message_content)=>{

            client.write(JSON.stringify({"sender": `${answers.sender_name }`, "group": `${broadcast.group_name}`,"action":'gbroadcast', 'msg': message_content}))
          })
          
        })
      }
        //{sender: sender_name , group: 'group_name', dest: receiver_name, action:'invite'}

        if (answers.typess=="invite"){

          inquirer.prompt([
    
            {
                type :'input',
                message:'qui voulez vous inviter?',
                name: 'receiver_name',
                
            },
            {
              type :'input',
              message:'Dans quel groupe voulez vous linviter?',
              name: 'group_name',
              
          },
          
        
          ]).then(inviter=>{
          client.write(JSON.stringify({"sender": `${answers.sender_name }`,"group": `${inviter.group_name}`, "dest": `${inviter.receiver_name}`,"action":'invite'}))
            
      
          })
        }
       


        if (answers.typess=="kick"){

          inquirer.prompt([
    
            {
                type :'input',
                message:'qui voulez vous exclure du groupe?',
                name: 'receiver_name',
                
            },
            {
              type :'input',
              message:'De quel groupe?',
              name: 'group_name',
              
          },
          
            {
              type :'input',
              message:'Et pour quelles raisons?',
              name: 'reason',
              
          }
          ]).then(quitte1=>{
          client.write(JSON.stringify({"sender": `${answers.sender_name }`,"group": `${quitte1.group_name}`, "dest": `${quitte1.receiver_name}`,"action":'kick',"reason": quitte1.reason }))
            
      
          })
        }

        if (answers.typess=="ban"){

          inquirer.prompt([
    
            {
                type :'input',
                message:'qui voulez vous definitivemnt du groupe?',
                name: 'receiver_name',
                
            },
            {
              type :'input',
              message:'De quel groupe?',
              name: 'group_name',
              
          },
          
            {
              type :'input',
              message:'Et pour quelles raisons?',
              name: 'reason',
              
          }
          ]).then(quitte2=>{
          client.write(JSON.stringify({"sender": `${answers.sender_name }`,"group": `${quitte2.group_name}`, "dest": `${quitte2.receiver_name}`,"action":'kick',"reason": quitte2.reason }))
            
      
          })
        }

        if(answers.typess=="states"){

          inquirer.prompt([
    
            {
                type :'input',
                message:'voulez vous les evenements de quel groupe?',
                name: 'states',
            } ]).then(even=>{

          client.write(JSON.stringify({"sender": `${answers.sender_name}`,"group": `${even.states }`,"action":'states'}))
        })
      }
      if(answers.typess=="prive"){

        inquirer.prompt([
  
          {
              type :'input',
              message:'le message priv??e est address?? a qui?',
              name: 'prive',
          },
          /*{
            type :'input',
            message:'saisissez le message?',
            name: 'message',
        }*/
      
        ]).then(priv=>{
          const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          readline.on('line',(message_content)=>{

            client.write(JSON.stringify({"sender": `${answers.sender_name }`,"dest": `${priv.prive }`,"group": `${answers.group_name}`,"action":'prive', 'msg': message_content}))
          })
        /*client.write(JSON.stringify({"sender": `${answers.sender_name}`,"dest": `${priv.prive}`,"action":'prive', "msg":`${priv.message}`}))*/
      })
    }
       
      
  })

