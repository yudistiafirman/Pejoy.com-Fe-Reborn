function scrollFunction() {
    if(document.body.scrollTop > 25 || document.documentElement.scrollTop > 25){
        return document.getElementById("navbar").className = "w-100 px-0 py-3 position-fixed pa-navbar-mobile-display pa-bg-main-light border-bottom"; 
  }else{
        return document.getElementById("navbar").className = "w-100 px-0 py-3 position-fixed pa-navbar-mobile-display";
  }
}

export default scrollFunction