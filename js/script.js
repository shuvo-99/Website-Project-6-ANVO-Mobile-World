const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  
  // clear data
  searchField.value = "";
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = '';

  
  // if search input is empty
  if (searchText == ''){
    const showError1 = document.getElementById("input-empty");
    showError1.style.display = "block";
    const showError2 = document.getElementById("phn-not-found");
    showError2.style.display = "none";
    const searchResult = document.getElementById("search-result");
    searchResult.textContent ='';

  }
  else{
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((info) => displaySearchResult(info.data.slice(0,20)));
      
    // showError.style.display = "none";

  }
  
};

const displaySearchResult = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent ='';

  if (data.length==0){
    // show error
    const showError1 = document.getElementById("input-empty");
    showError1.style.display = "none";
    const showError2 = document.getElementById("phn-not-found");
    showError2.style.display = "block";
    
    

  }
  else{
    // hide error
    const showError2 = document.getElementById("phn-not-found");
    showError2.style.display = "none";
    const showError1 = document.getElementById("input-empty");
    showError1.style.display = "none";
    
    data.forEach((phone) => {
    
      // console.log(dat);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div  class="card h-100 w-75">
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body ">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">
          ${phone.brand}
          </p>
          <a href="#" onclick='loadPhoneDetail("${phone.slug}")' class="btn btn-primary">Details</a>
        </div>
      </div>
      `;
      searchResult.appendChild(div);
    });
  }
  // data.forEach((phone) => {
    
  //   // console.log(dat);
  //   const div = document.createElement("div");
  //   div.classList.add("col");
  //   div.innerHTML = `
  //   <div  class="card h-100 w-75">
  //     <img src="${phone.image}" class="card-img-top" alt="..." />
  //     <div class="card-body ">
  //       <h5 class="card-title">${phone.phone_name}</h5>
  //       <p class="card-text">
  //       ${phone.brand}
  //       </p>
  //       <a href="#" onclick='loadPhoneDetail("${phone.slug}")' class="btn btn-primary">Details</a>
  //     </div>
  //   </div>
  //   `;
  //   searchResult.appendChild(div);
  // });
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
  // console.log(phone);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = '';
  const div = document.createElement("div");
  div.classList.add("card");
  // const features = JSON.stringify(phone.mainFeatures);
  // if (phone.releaseDate == ''){
  //   phone.releaseDate = 'Will be released soon' 

  // }

  if (phone.mainFeatures.sensors == ''){
    phone.mainFeatures.sensors = 'Not Found' 

  }
  console.log(phone);
  // console.log(phone.hasOwnProperty(mainFeatures))
  'others' in phone ;
  if (phone.others !== undefined){
    // phone.mainFeatures.sensors = 'Not Found'
    console.log('yes present') 
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title font-size-phn-name">${phone.name}</h5>
      <p class="card-text bold font-size-brand">${phone.brand}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Storage: </span>${phone.mainFeatures.storage}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Display Size: </span>${phone.mainFeatures.displaySize}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Chipset: </span>${phone.mainFeatures.chipSet}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Memory: </span>${phone.mainFeatures.memory}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Release Date: </span>${phone.releaseDate ? phone.releaseDate : "Will be released soon" }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Sensors: </span>${phone.mainFeatures.sensors}
      </p><hr>
      <p class="card-text fs-bold"> <span class='light-bold'>Others: </span>
      </p>
      <p class="card-text"> <span class='light-bold'>WLAN: </span>${phone.others.WLAN ? phone.others.WLAN : 'Data not found' }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Bluetooth: </span>${phone.others.Bluetooth ? phone.others.Bluetooth : 'Data not found' }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>GPS: </span>${phone.others.GPS ? phone.others.GPS : 'Data not found' }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>NFC: </span>${phone.others.NFC ? phone.others.NFC : 'Data not found' }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Radio: </span>${phone.others.Radio ? phone.others.Radio : 'Data not found' }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>USB: </span>${phone.others.USB ? phone.others.USB : 'Data not found' }
      </p>
         
    </div>
    `;
    phoneDetails.appendChild(div);
  }

  else{
    console.log('not present')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title font-size-phn-name">${phone.name}</h5>
      <p class="card-text bold font-size-brand ">${phone.brand}
      </p><hr>  
      <p class="card-text"> <span class='light-bold'>Storage: </span> ${phone.mainFeatures.storage}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Display Size: </span>${phone.mainFeatures.displaySize}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Chipset: </span>${phone.mainFeatures.chipSet}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Memory: </span>${phone.mainFeatures.memory}
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Release Date: </span>${phone.releaseDate ? phone.releaseDate : "Will be released soon" }
      </p><hr>
      <p class="card-text"> <span class='light-bold'>Sensors: </span>${phone.mainFeatures.sensors}
      </p>
         
    </div>
    `;
    phoneDetails.appendChild(div);

  }  
  // div.innerHTML = `
  // <img src="${phone.image}" class="card-img-top" alt="..." />
  // <div class="card-body">
  //   <h5 class="card-title">${phone.name}</h5>
  //   <p class="card-text">${phone.brand}
  //   </p>
      
  //   <p class="card-text"> Storage: ${phone.mainFeatures.storage}
  //   </p>
  //   <p class="card-text"> Display Size: ${phone.mainFeatures.displaySize}
  //   </p>
  //   <p class="card-text"> Chipset: ${phone.mainFeatures.chipSet}
  //   </p>
  //   <p class="card-text"> Memory: ${phone.mainFeatures.memory}
  //   </p>
  //   <p class="card-text"> Release Date: ${phone.releaseDate ? phone.releaseDate : "Will be released soon" }
  //   </p>
  //   <p class="card-text"> Sensors: ${phone.mainFeatures.sensors}
  //   </p>
    
    
    
      
  // </div>
  // `;
  // phoneDetails.appendChild(div);
  
};


{/* <p class="card-text"> Others: ${ phone.others?phone.others :'Not Found'}
    </p>
    <p class="card-text"> WLAN: ${phone.others.WLAN ? phone.others.WLAN : 'Data not found' }
    </p>
    <p class="card-text"> Bluetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'Data not found' }
    </p>
    <p class="card-text"> GPS: ${phone.others.GPS ? phone.others.GPS : 'Data not found' }
    </p>
    <p class="card-text"> NFC: ${phone.others.NFC ? phone.others.NFC : 'Data not found' }
    </p>
    <p class="card-text"> Radio: ${phone.others.Radio ? phone.others.Radio : 'Data not found' }
    </p>
    <p class="card-text"> USB: ${phone.others.USB ? phone.others.USB : 'Data not found' }
    </p> */}