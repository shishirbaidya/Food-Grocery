const list = [{ name: 'apple', image: 'soda.png' },];
const foodlist=[
    {name: "Appl", price: 3.44, image: "images/apple.png"},
    {name: "Banana", price: 2.00, image: "images/banana.png"},
    {name: "Orange", "price": 2.50, "image": "images/fruit.png"},
    {name: "Carrot", "price": 2.50, "image": "images/carrot.png"},
    {name: "Avocado", "price": 2.50, "image": "images/avocado.png"},
    {name: "Mango", "price": 2.50, "image": "images/mango.png"},
    {name: "WaterMelon", "price": 2.50, "image": "images/watermelon.png"},
    {name: "Chery", "price": 2.50, "image": "images/cherries.png"},
   
    
    
  ]
  const drinksandsnack=[
    {"name": "Beer", "price": 3.44, "image": "images/beer-can.png"},
    {"name": "ColaCan", "price": 2.00, "image": "images/can.png"},
    {"name": "Coca-Cola", "price": 2.50, "image": "images/cola.png"},
    {"name": "Eggs", "price": 2.50, "image": "images/egg.png"},
    {"name": "Masala", "price": 2.50, "image": "images/handmasala.png"},
    {"name": "OrangeJuice", "price": 2.50, "image": "images/soda.png"},
    {"name": "Oil", "price": 2.50, "image": "images/oil.png"},
    {"name": "MilkPowder", "price": 2.50, "image": "images/milk-powder.png"},
    {"name": "Chilli-Powder", "price": 2.50, "image": "images/powder_masala-chili.png"},
    {"name": "Snacks", "price": 2.50, "image": "images/snacks.png"}
  ]
  const foods=[
    {"name": "Biryani", "price": 3.44, "image": "images/biryani.png"},
    {"name": "Banana", "price": 2.00, "image": "images/pizza.png"},
    {"name": "Orange", "price": 2.50, "image": "images/french-fries.png"},
    {"name": "Orange", "price": 2.50, "image": "images/donut.png"},
    {"name": "Burger", "price": 2.50, "image": "images/burger.png"},
    {"name": "Tteok", "price": 2.50, "image": "images/tteok.png"},
    {"name": "Orange", "price": 2.50, "image": "images/cake.png"},
    {"name": "Orange", "price": 2.50, "image": "images/pie.png"},
    {"name": "Orange", "price": 2.50, "image": "images/oil.png"},
    {"name": "Orange", "price": 2.50, "image": "images/cooking-oil.png"},
    {"name": "Orange", "price": 2.50, "image": "images/chees.png"},
    {"name": "Orange", "price": 2.50, "image": "images/orange.png"}
  ]
  const meat_veg=[
    {"name": "Apple", "price": 3.44, "image": "images/meat.png"},
    {"name": "Chicken", "price": 2.00, "image": "images/chicken.png"},
    {"name": "Roast Chicken", "price": 2.50, "image": "images/roast-chicken.png"},
    {"name": "Lobster", "price": 2.50, "image": "images/lobster.png"},
    {"name": "prawn", "price": 2.50, "image": "images/prawn.png"},
    {"name": "Orange", "price": 2.50, "image": "images/vegetable.png"},
    {"name": "Broccoli", "price": 2.50, "image": "images/broccoli.png"},
    {"name": "Chickenliver", "price": 2.50, "image": "images/chickenliver.png"},
    {"name": "Orange", "price": 2.50, "image": "images/lemon.png"},
    {"name": "SugarCane", "price": 2.50, "image": "images/sugar-cane.png"}
  ]
  


function show(row,listItems) {

  const area = document.getElementById(row);
listItems.forEach(list=>{
  const card = document.createElement('div');
  card.className = 'items';
  card.setAttribute('data-name',list.name)

  const img = document.createElement('img');
  img.src = list.image;
  img.className = 'images'; 

  const nameText = document.createElement('p');
  nameText.textContent = list.name;

    const button=document.createElement('button');
    button.className='addtocard';
    button.textContent='Add To Card';

    //Adding all children to the item card
  card.appendChild(img);
  card.appendChild(nameText);
  card.appendChild(button);
 
  area.appendChild(card);
});
}

//profile
 function showSection(sectionToShow) {
    // List of all section IDs
    const sections = ['top-view','main-view', 'input', 'profileSection'];

    // Loop through each section
    sections.forEach(section => {
      document.getElementById(section).style.display = section === sectionToShow ? 'block' : 'none';
    });
  }





// Proper way to run function after page is fully loaded
window.onload = function () {
  show("row1",foodlist);

  show("row2",drinksandsnack)
  show("row3",foods)
  show("row4",meat_veg)
};