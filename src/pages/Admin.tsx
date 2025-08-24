import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useState } from "react";
import { ADD_HOTEL } from "../mutations/hotelMutations";
import { GET_HOTELS } from "../queries/hotelQueries";





const Admin = () => {
  const { data } = useQuery(GET_HOTELS);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any | null>(null);

  const [addHotel, mutation] = useMutation(ADD_HOTEL, {
    refetchQueries: [
      {
        query: GET_HOTELS,
      },
    ],
    onError(error, clientOptions) {
      console.log(error.message);
      console.log(error.networkError);
      console.log(error.graphQLErrors);
    },
  });

  const uploadImage = async (e: any) => {
    const data = {
      file: e.target.files[0],
      upload_preset: "staycation",
    };
    setFile(data);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (!file) {
      console.log("No image added");
    } else {
      console.log(file);
      const instance = await axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = await instance.post(
        "https://api.cloudinary.com/v1_1/clothing-wave/image/upload",
        file
      );

      console.log({
        name,
        location,
        price,
        image: result.data.secure_url,
        desc
      });

      await addHotel({
        variables: {
          name,
          location,
          price,
          image: result.data.secure_url,
          description: desc
        },
      });

      mutation.data ? console.log(mutation.data) : console.log(mutation.error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold my-6">Admin Page</h1>
        <form className="md:w-3/5 mb-6 flex flex-col items-center justify-between p-5 shadow-xl">
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            type={"text"}
          />
          <input
            className="input"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            type={"text"}
          />

          <input
            className="input"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            type={"text"}
          />
          <input
            className="input"
            placeholder="Image"
            onChange={(e) => uploadImage(e)}
            type={"file"}
          />
          <textarea
            className="h-16 input"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input className="input" placeholder="Add feauture" type={"text"} />
          <button className="btn mt-4" onClick={(e) => onSubmit(e)}>
            Submit
          </button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data?.hotels?.map((hotel: any) => (
            <div key={hotel.id} className="flex flex-col shadow-md rounded-b-lg">
              {hotel.image ? (
                <img className="h-auto w-auto mb-2" src={hotel.image} />
              ) : (
                <span>No Image Found</span>
              )}
              <div className="px-3 mb-3">
                <h1 className="mb-2"> {hotel.name} </h1>
                <h1 className="text-xs text-gray-500"> {hotel.location} </h1>
                <h1 className="text-xs normal-case text-pink-500">
                  {" "}
                  {hotel.price} per night{" "}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
