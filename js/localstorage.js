run();
var butmap = document.querySelector('button.map');
var v,a,b;
var limpar = document.querySelector('button.clear');
butmap.addEventListener('click',function(){
  window.location.href = "index.html"    
});
function run(){
    var table = document.querySelector('table.tab');
    for(i=0;i<localStorage.length;i++){
      
      v = JSON.parse(localStorage['favorito'+i]);
      b = document.createElement('tr');
      a = document.createElement('td');a.setAttribute('class','nametab');a.innerText=v.nome;b.appendChild(a);
      a = document.createElement('td');a.setAttribute('class','enderecotab');a.innerText=v.endereco;b.appendChild(a);
      a = document.createElement('td');a.setAttribute('class','numerotab');a.innerText=v.numero;b.appendChild(a);
      table.appendChild(b);
    }
}
limpar,addEventListener('click',function(){
  localStorage.clear();
});