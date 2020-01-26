const in1 = document.querySelector('input[name=title]');
const in2 = document.querySelector('input[name=name]');
       

$('button#add').click(() =>{
    
    fetch('http://localhost:3000/posts',{
        
        method:"POST",
        body: JSON.stringify({
         
            title: in1.value,
            name: in2.value         
        }),
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then((response)=>{
        
        return response.text();
        
    })
    .then((response) => {
        
        return  console.log(response);
        getList();
        
    });
});


    $('button#list').click(() => {
        fetch('http://localhost:3000/posts')
    
        .then((response)=>{
        
            return response.json(); 
        
        })
        .then((data) => {
     
            list(data);

        });
    });


function list(data) {
    
    const pageContent = document.querySelector('#content');
    pageContent.innerHTML = "";
    
    data.forEach((el, index) => {
        
        let div = document.createElement('div');
        //console.log(el);
        
        div.innerHTML = el.id +'  <input type="text" value=' + el.title + '><input type="text" value=' + el.name + "><button id= 'update' >Update</button><br>";
        
        
        div.addEventListener('click', () => { 
            
            //let input = div.querySelectorAll('input');
            let input = div.querySelectorAll('input');
            let updater = div.querySelector('button');
               
                updater.addEventListener('click', ()=> {
            
                    updateData(el.id,input[0].value,input[1].value)  
                });
            
        });
           
       pageContent.appendChild(div);
        
    });

    
};

function updateData(id, val1, val2){
    
    
  
    fetch('http:/localhost:3000/posts/' + id, {
        
        method: "PUT",
        body: JSON.stringify({
            title:val1,
            name:val2
        }),
        headers: {
            "Content-Type": "application/json"
        }
        
    }).then((response) => {
        
    return response.text();
        
    }).then((response) => {
           
    console.log(response);     
    
           
    });
    
}
