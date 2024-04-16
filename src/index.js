const breedDropdown = document.getElementById('breed-dropdown');
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const breedListContainer = document.getElementById('dog-breeds');
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const imgContainer = document.getElementById('dog-image-container');
imgContainer.textContent = 'Loading...';

// Fetch 1: Get dog images using standard fetch
fetch(imgUrl)
  .then((response) => {
    if (!response.ok) {
      throw new error(
        `Network response failed. Status Code: ${response.status}`
      );
    }
    return response.json();
  })
  .then((data) => {
    if (!data.message) {
      throw new Error('Unexpected API response format.');
    }
    return data.message;
  })
  .then((images) => {
    imgContainer.textContent = '';
    images.forEach((image) => {
      const dogImage = document.createElement('img');
      dogImage.src = image;
      imgContainer.append(dogImage);
    });
  })
  .catch((error) => {
    console.log(error);
    const errorElement = document.createTextNode(
      'Error loading images, please refresh.'
    );
    imgContainer.append(errorElement);
  });

// Fetch 2: Get breed list using async/await
(loadDogBreeds = async () => {
  try {
    const response = await fetch(breedUrl);
    if (!response.ok) {
      throw new Error(
        `Network response failed. Status Code: ${response.status}`
      );
    }
    const data = await response.json();
    if (!data.message) {
      throw new Error('Unexpected API response format.');
    } else {
      const breeds = Object.keys(data.message);
      for (const breed of breeds) {
        const breedLi = document.createElement('li');
        breedLi.textContent = breed;
        breedListContainer.append(breedLi);
        breedLi.addEventListener('click', changeTextColor);
      }
    }
  } catch (error) {
    console.error(error);
    breedListContainer.textContent =
      'Error loading breed list, please refresh.';
  }
})();

const changeTextColor = (event) => {
  event.target.classList.toggle('selected');
};

const filterBreeds = (letter) => {
  const breedListItems = breedListContainer.querySelectorAll('li');
  if (letter === 'all') {
    breedListItems.forEach((item) => {
      item.style.display = 'list-item';
    });
    return;
  }
  breedListItems.forEach((item) => {
    const breedName = item.textContent.toLowerCase();
    const shouldShow = breedName.startsWith(letter);
    item.style.display = shouldShow ? 'list-item' : 'none';
  });
};

breedDropdown.addEventListener('change', () => {
  const selectedLetter = breedDropdown.value;
  filterBreeds(selectedLetter);
});
