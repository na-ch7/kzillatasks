function FDThenCatch() {
  fetch('https://hp-api.herokuapp.com/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
FDThenCatch();
