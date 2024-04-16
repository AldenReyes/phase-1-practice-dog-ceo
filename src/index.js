const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const imgContainer = document.getElementById('dog-image-container');
imgContainer.textContent = 'Loading...';

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
      throw new error('Unexpected API response format.');
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
