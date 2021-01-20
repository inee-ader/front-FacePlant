import axios from 'axios';
import React, { Component } from 'react';
import PlantImage from './ImageUploader'


const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com/'
const LOCAL = 'http://localhost:3000'

class EditPlant extends Component {

    constructor(props){
        super(props)
        this.state={
            user_id: null,
            common_name: '', 
            plant_name: '', 
            image_url: '', 
            personality: '', 
            insight: '', 
            story_notes: '', 
            // monograph_id: null, 
            difficulty: 1, 
            sunlight: 1, 
            moisture: 1
        }
    }

    // first time mounting, user_id comes through, but upon refrsh, user_id in state is undefined.
    componentDidMount(){
        this.setState({
            user_id: this.props.user.id
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // const { user_id, common_name, plant_name, image_url, personality, insight, story_notes, monograph_id, difficulty, sunlight, moisture } = this.state

        axios.patch(`${LOCAL}/user_plants/${id}`, {
            user_plant: {
                user_id: user_id, 
                user_fav: false, 
                // monograph_id: monograph_id, 
                common_name: common_name, 
                plant_name: plant_name,
                image_url: image_url, 
                personality: personality, 
                insight: insight, 
                story_notes: story_notes,
                difficulty: difficulty, 
                sunlight: sunlight, 
                moisture: moisture
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created'){
                console.log(response.data.user_plant)
                //not sure what to do here
                this.props.handleAddPlant(response.data.user_plant)
                this.props.history.push('/dashboard')
            }
        }).catch(error => {
            console.log("add plant error: ", error)
        })
    }

    setImageState = (data) => {
        let url = data[0].name
        this.setState({
            image_url: url
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Edit this plant!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="image_url"> Picture </label>
                    <PlantImage setImageState={this.setImageState} />
                    <br></br>
                    <label htmlFor="common_name"> Common Name </label>
                    <input 
                        name="common_name"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="plant_name"> Has it got a nick name? </label>
                    <input 
                        name="plant_name" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    <label htmlFor="personality"> Personality </label>
                    <textarea 
                        name="personality" 
                        placeholder="Judges me from the corner." 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="insight"> My best advice: </label>
                    <textarea 
                        name="insight" 
                        placeholder="Frequent misting." 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="story_notes"> Story/Notes </label>
                    <textarea 
                        name="story_notes" 
                        placeholder="Where did it come from?" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    <label htmlFor="difficulty"> Difficulty - 1 is easy, 5 is hard</label>
                     <select name="difficulty" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label htmlFor="sunlight"> Sunlight - 1 is shady, 5 is full sun</label>
                     <select name="sunlight" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label htmlFor="moisture"> Moisture - 1 is dry, 5 is very wet</label>
                     <select name="moisture" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <br></br>
                    <br></br>
                    <button type="submit"> Add Plant </button>
                </form>
            </div>
        );
    }
}

export default EditPlant;