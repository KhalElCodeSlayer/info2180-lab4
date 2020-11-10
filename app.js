window.addEventListener('load', function() {
    let searchBtn = document.getElementById('btn');

    searchBtn.addEventListener('click', function(element) {
        element.preventDefault();

        fetch("superheroes.php")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    return Promise.reject('something went wrong!')
                }
            })
            .then(data => {
                alert(`Superheroes List\n ${data}`);
            })
            .catch(error => console.log('There was an error: ' + error));
    });
});