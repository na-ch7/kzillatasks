async function FDawait() {
    try {
        const response = await fetch('https://hp-api.herokuapp.com/');
        if (!response.ok) {
        throw new Error(`HTTP error!`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
      console.log("wrong url");
    }
  }

FDawait();
