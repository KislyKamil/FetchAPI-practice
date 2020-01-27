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
        
        console.log(response);
        getList();
        
    });
});



$('button#list').click(() => {
        
      getList();
    });


function listData(data) {
    
    const pageContent = document.querySelector('#content');
    pageContent.innerHTML = "";
    
    data.forEach((el, index) => {
        
        let div = document.createElement('div');
        //console.log(el);
        
        div.innerHTML = el.id +'  <input type="text" value=' + el.title + '><input type="text" value=' + el.name + "><button id= 'update' >Update</button><button id=" + el.id + " class='delete' >Remove</button><br>";
        
        let remover = div.querySelector('button.delete');
        
        
        remover.addEventListener('click', ()=> {
            
                    removeData(el.id, el.title, el.name);
                });
        
        div.addEventListener('click', () => { 
            
            //let input = div.querySelectorAll('input');
            let input = div.querySelectorAll('input');
            let updater = div.querySelector('button#update');
            //let remover = div.querySelector('button.delete');
               
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

function removeData(id, val1, val2){
    
    fetch('http:/localhost:3000/posts/' + id, {
        
        method: "DELETE",
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
           
    console.log("Deleted succesfully");     
        
    getList();
           
    });
}


function getList(){
    
fetch('http://localhost:3000/posts')
    
        .then((response)=>{
        
            return response.json(); 
        
        })
        .then((data) => {
            
           // console.log(data);
            return listData(data);

        });
};