/******** Menu ********/

((d) => {
  const $btnMenu = document.querySelector(".menu-btn"),
    $menu = document.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) =>{
      //En el boton menu intercambiamos en su lista de clases la clase none
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", (e) =>{
      if(!e.target.matches(".menu a")) return false;

      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
    })

})(document);

/******** Formulario ********/
((d)=>{
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) =>{
      e.preventDefault();
      $loader.classList.remove("none");
      fetch("https://formsubmit.co/ajax/eduardelarosa09@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(json => {
        console.log(json);
        $loader.classList.add("none");
        location.hash = "#gracias";
        $form.reset();
      })
      .catch(err=> {
        console.log(err);
        let message = err.statusText || "Ocurrio un error, intenta enviar nuevamente";
        $response.querySelector("h3").innerHTML = `Error #{err.status} : ${message}`;
      }).finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
    });
})(document);