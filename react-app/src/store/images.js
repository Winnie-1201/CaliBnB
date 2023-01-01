const GET_ALL = "images/getAllImages";
// const GET_ONE = "images/getOneImage"
const CHANGE = "images/changeImage";
// const ADD = "images/addImage";
const DELETE = "images/deleteImage";

const getAll = (images) => ({
  type: GET_ALL,
  images,
});

// // const getOne = image => ({
// //     type: GET_ONE,
// //     image
// // })

const changeImg = (image) => ({
  type: CHANGE,
  image,
});

// const addImg = (image) => ({
//   type: ADD,
//   image,
// });

const deleteImg = (imageId) => ({
  type: DELETE,
  imageId,
});

export const getImgsBySpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/images`);

  if (response.ok) {
    const images = await response.json();
    dispatch(getAll(images.images));
  }
};

export const changeImgThunk = (imgId, imgFile, preview) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", imgFile);
  formData.append("preview", preview);

  const response = fetch(`/api/images/${imgId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    const img = await (await response).json();
    dispatch(changeImg(img));
  }
};

const initialState = { allImages: {} };

export default function imageReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      action.images.forEach((img) => {
        newState.allImages[img.id] = img;
      });
      return newState;
    case CHANGE:
      newState.allImages[action.image.id] = action.image;
      return newState;
    default:
      return state;
  }
}
