window.addEventListener('load', function() {
    let searchbtn = document.getElementById('btn');
    var mynote;
    searchbtn.addEventListener('click', async function(element) {
        element.preventDefault();
        var heroForm = document.getElementById("superhero").value;
        var message = document.getElementsByClassName("message")[0];
        var name = document.getElementsByClassName("heroname")[0]; 
        var alias = document.getElementsByClassName("alias")[0]; 
        var biography = document.getElementsByClassName("biography")[0];  

        if (heroForm === ''){
            fetch("superheroes.php")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                message.innerHTML = data;
                name.innerHTML = '' ;
                alias.innerHTML = '';
                biography.innerHTML = '';
            })
            .catch(error => console.log('There was an error: ' + error));
        }else{
            
            fetch("superheroes.php", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(heroForm)
            })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                var hero = JSON.parse(data);
                if (typeof(hero) === "string"){
                    biography.innerHTML = data ;
                } else if (typeof(hero) === "object"){
                    var hname = hero["name"];
                    var aname = "A.K.A  " + hero["alias"];
                    var bio = hero["biography"];
                    message.innerHTML = '';
                    name.innerHTML = hname ;
                    alias.innerHTML = aname;
                    biography.innerHTML = bio;
                }
            });
        }     
    });
})