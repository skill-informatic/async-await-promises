const elements = document.querySelector("#elements");

document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://jsonplaceholder.typicode.com/users";

  const result = await getUsersAwait(url);
  console.log("result", result);

  showContent(result);
});
async function getUsersAwait(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error al obtener los usuarios. Código de estado: ${response.status}`
      );
    }

    const users = await response.json();
    // showContent(users);
    return users;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function getUsersPromises(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener los usuarios. Código de estado: ${response.status}`
        );
      }
      return response.json();
    })
    .then((users) => {
      // showContent(users);
      return users;
    })
    .catch((error) => {
      return `Error: ${error.message}`;
    });
}

const showContent = (users) => {
  // Utilizamos un fragmento para construir los elementos antes de agregarlos al DOM
  const fragment = document.createDocumentFragment();
  // Recorremos la lista de usuarios y creamos los elementos

  if (typeof users === "string") {
    elements.innerHTML = "";
    const Alert = document.createElement("h3");
    Alert.textContent = "Hubo un Error";
    Alert.classList.add("alert");
    return elements.appendChild(Alert);
  }

  users.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.id = user.id;
    userElement.innerHTML = `
          <h3>Name: ${user.name}</h3>
          <p>Email: ${user.email}</p>
        `;
    fragment.appendChild(userElement);
  });

  // Limpiamos el contenido existente en elements
  elements.innerHTML = "";

  // Agregamos los elementos al DOM de una sola vez
  return elements.appendChild(fragment);
};

