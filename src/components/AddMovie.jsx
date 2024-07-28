
import React, { useEffect, useState } from 'react'
import { postData } from '../api-integration/api';
import { getData } from '../api-integration/api';


const initialFormdata = {
    name: "",
    description: "",
    rating: null,
    duration: null,
    posterImageUrl:''

};


const AddMovie = () => {

    let [formdata, setFormdata] = useState(initialFormdata);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formdata: " + JSON.stringify(formdata));

        try {
            const res = await postData("movie/add", formdata);
            console.log("Response: " + JSON.stringify(res));
        } catch (error) {
            console.error("Error submitting data: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    //List of Movies

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const result = await getData('movie/movies');
            setMovies(result);
            console.log(JSON.stringify(result));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };





    return (




        <div className='flex flex-col p-2 mt-20'>
            <form className="max-w-sm mx-auto w-1/2" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label for="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Add Movie</label>
                    <input
                        value={formdata.name}
                        onChange={handleInputChange}
                        name="name"
                        type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                </div>

                <div className="mb-5">
                    <textarea
                        value={formdata.description}
                        onChange={handleInputChange}
                        name="description"
                        id="description"
                        rows="4" // Set the number of visible rows
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description" required />
                </div>
                <div className="mb-5">
                
                    <input
                        value={formdata.rating}
                        onChange={handleInputChange}
                        name="rating"
                        type="text" id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rating" required />
                </div>

                <div className="mb-5">
                    <input
                        value={formdata.duration}
                        onChange={handleInputChange}
                        name="duration"

                        type="text" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Duration" required />
                </div>

                <div className="mb-5">
                    <input
                        value={formdata.posterImageUrl}
                        onChange={handleInputChange}
                        name="posterImageUrl"

                        type="text" id="posterImageUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Poster Image URL" required />
                </div>

                


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

            <div className="container mx-auto p-10 w-1/2">
                <h1 className="text-2xl font-bold mb-4">List of Movies</h1>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200">Movie</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                            <th className="py-2 px-4 border-b border-gray-200">Rating</th>
                            <th className="py-2 px-1 border-b border-gray-200">Duration</th>
                            <th className="py-2 px-1 border-b border-gray-200">PosterImageURL</th>
                            <th className="py-2 px-1 border-b border-gray-200">Edit</th>
                            <th className="py-2 px-1 border-b border-gray-200">Delete</th>


                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-200">{movie.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{movie.description ? `${movie.description.substring(0, 15)}...` : ''}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{movie.rating}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{movie.duration}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{movie.posterImageUrl ? `${movie.posterImageUrl.substring(0, 15)}...` : ''}</td>

                                <td className="py-2 px-1 border-b border-gray-200"><button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button></td>
                                <td className="py-2 px-1 border-b border-gray-200"> <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>

    )
}

export default AddMovie