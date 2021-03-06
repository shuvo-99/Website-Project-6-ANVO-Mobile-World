const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log("yes");
    searchField.value = "";
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        fetch(url)
            .then((res) => res.json())
            .then((info) => displaySearchResult(info.data));
    } catch (error) {
           console.log(error)
    }
            
        
            // const showError = document.getElementById("input-empty");
            // showError.style.display = "block";
    
     
};
  
const displaySearchResult = (data) => {
    
    const searchResult = document.getElementById("search-result");
    searchResult.textContent ='';


    data.forEach((phone) => {
        // console.log(dat);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div onclick='loadPhoneDetail("${phone.slug}")' class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
            ${phone.brand}
                </p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        });
};
  
const loadPhoneDetail = (phoneID) => {
    // console.log(phoneID);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}
    `;
    fetch(url)
      .then((res) => res.json())
      .then((info) => displayPhoneDetail(info.data));
};
  
const displayPhoneDetail = (phone) => {
    
    console.log(phone);
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = '';
    const div = document.createElement("div");
    div.classList.add("card");
        // const features = JSON.stringify(phone.mainFeatures);
    if (phone.releaseDate == ''){
        phone.releaseDate = 'Will be released soon' 
    
    }
        
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.brand}
        </p>
        
        <p class="card-text"> Storage: ${phone.mainFeatures.storage}
        </p>
        <p class="card-text"> Display Size: ${phone.mainFeatures.displaySize}
        </p>
        <p class="card-text"> Chipset: ${phone.mainFeatures.chipSet}
        </p>
        <p class="card-text"> Memory: ${phone.mainFeatures.memory}
        </p>
        <p class="card-text"> Release Date: ${phone.releaseDate}
        </p>
        
    </div>
    `;
    phoneDetails.appendChild(div);
    
    
};
