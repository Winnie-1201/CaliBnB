// const GET_ALL = "images/getAllImages";
// const GET_ONE = "images/getOneImage"
const CHANGE = "images/changeImage";
const ADD = "images/addImage";
const DELETE = "images/deleteImage";

// const getAll = images => ({
//     type: GET_ALL,
//     images
// })

// const getOne = image => ({
//     type: GET_ONE,
//     image
// })

const changeImg = (image) => ({
  type: CHANGE,
  image,
});

const addImg = (image) => ({
  type: ADD,
  image,
});

const deleteImg = (imageId) => ({
  type: DELETE,
  imageId,
});

// export const getOneImage
