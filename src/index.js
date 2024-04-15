const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const imgContainer = document.getElementById('dog-image-container');

fetch(imgUrl)
  .then((response) => {
    if (!response.ok) {
      throw new error('Network response failed');
    }
    return response.json();
  })
  .then((images) => {
    images.message.forEach((image) => {
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
