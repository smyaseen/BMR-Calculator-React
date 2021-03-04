import React, { Component } from 'react'
import '../styles/bmr.css'


class bmr extends Component {
    
    constructor() {
        super();
        this.state = {
            gender: '2',
            weight: '60',
            age: '20',
            heightFeet: '6',
            heightInches: '1',
            activity: '',
            bmr: '',
            error: '',
            calories: '',
            unit: '1',
            heightInCm: '180'
        }
    }
    
    handleAgeChange = (event) => {
        this.setState({age: event.target.value});
    }

    handleWeightChange = (event) => {
        this.setState({weight: event.target.value},() => console.log("weight: " + this.state.weight));
    }

    handleHeightinFeetChange = (event) => {
        this.setState({heightFeet: event.target.value},() => console.log("feet: " + this.state.heightFeet));
    }

    handleHeightinInchesChange = (event) => {
        this.setState({heightInches: event.target.value},() => console.log("inches: " + this.state.heightInches));
    }

    handleGenderChange = (event) => {
        this.setState({gender: event.target.value},() => console.log("gender: " + this.state.gender));
    }

    handleActivityChange = (event) => {
        this.setState({activity: event.target.value},() => console.log("activity: " + this.state.activity));
    }

    handleUnitChange = (event) => {
        this.setState({unit: event.target.value},() => console.log("unit: " + this.state.units));
        
    }

    heightInCm = (event) => {
        this.setState({heightInCm: event.target.value},() => console.log("heightInCm: " + this.state.heightInCm));
        
    }




    /*
BMR calculation (imperial): 
Man BMR = 66 + ( 6.2 × weight in pounds ) + ( 12.7 × height in inches ) – ( 6.76 × age in years )
Woman BMR = 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) - ( 4.7 × age in years )
    */

    /*
BMR calculation (Metric): 
Man BMR = 66.5 + ( 13.75 × weight in kg ) + ( 5.003 × height in cm ) – ( 6.755 × age in years )
Woman BMR = BMR = 655 + ( 9.563 × weight in kg ) + ( 1.850 × height in cm ) – ( 4.676 × age in years )
    */

    calculateBMR() {
        let age = this.state.age;
        let gender = this.state.gender;
        let heightInFeet = this.state.heightFeet;
        let heightInInches = this.state.heightInches;
        let weight = this.state.weight;
        let unit = this.state.unit;
        let heightInCm = this.state.heightInCm;

       
        if (age === '' || gender === '' || heightInFeet === '' || heightInInches === '' || weight === '') {
            this.setState({error: 'All fields are required!'});
            return;
        } else {
            this.setState({error: ''});
        }

        let bmrCalc = '';
        console.log("gender " + gender + " " + bmrCalc); 
        
        if (gender === "2") {
            if (unit === '1')
            bmrCalc = 66 + (6.2 * weight) + (12.7 + heightInInches) - (6.76 * age); 
            else 
            bmrCalc = 66.5 + ( 13.75 * weight) + ( 5.003 * heightInCm ) - ( 6.755 * age);
            
        } else if (gender === "1") {
            if (unit === '1')
            bmrCalc = 655.1 + ( 4.35 * weight) + ( 4.7 * heightInInches ) - ( 4.7 * age); 
            else
            bmrCalc = 655 + ( 9.563 * weight) + ( 1.850 * heightInCm ) - ( 4.676 * age); 

        }

        this.setState({bmr: bmrCalc});

    }

    calculateCalories() {
        if (this.state.bmr !== '') {
            this.setState({calories: this.state.bmr * this.state.activity});
        }
    }
    
    render() {

        let error;
        if (this.state.error) {
            error = <div className="error">{this.state.error}</div>
        }

        let resultBMR;
        if (this.state.bmr) {
            resultBMR = <div className="result">{this.state.bmr}</div>
        }
        let resultCalorie;
        if (this.state.calories) {
            resultCalorie = <div className="result">{this.state.calories}</div>
        }

        let weightUnit;
        let heightLabel;

        if (this.state.unit === '1') {
            weightUnit = 'Pound';
            heightLabel = 'Height in feet and inches';
        }
        else {
            weightUnit = 'Kg'
            heightLabel = 'Height in cm';
        }


        

        return (
            <div id="bmrcalc">
                <div className="form">
                    <h2>BMR &amp; Daily Calorie Calculator</h2>
                    {error}
                    <div className="inputwrap">
                        <label className="label">Unit</label><label>
                            <input type="radio" className="Imperial" checked={this.state.unit === "1"} onChange={this.handleUnitChange} name="unit" value="1" />Imperial</label><label>
                            <input type="radio" className="Metric" checked={this.state.unit === "2"} onChange={this.handleUnitChange} name="unit" value="2" />Metric</label>
                    </div>
                    <div className="inputwrap">
                        <label className="label">Gender</label><label>
                            <input type="radio" className="genderF" checked={this.state.gender === "1"} onChange={this.handleGenderChange} name="gender" value="1" />Female</label><label>
                            <input type="radio" className="genderM" checked={this.state.gender === "2"} onChange={this.handleGenderChange} name="gender" value="2" />Male</label>
                    </div>
                    <div className="inputwrap">
                        <label className="label">Weight in {weightUnit}</label>
                        <input type="number" value={this.state.weight} onChange={this.handleWeightChange} name="weight" className="weight" min="0" max="999" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">{heightLabel}</label>
                        { this.state.unit === '1' ?
                         <div>
                        <input type="number" value={this.state.heightFeet} onChange={this.handleHeightinFeetChange}name="heightFeet" className="heightFeet" min="0" max="8" />
                        <input type="number" value={this.state.heightInches} onChange={this.handleHeightinInchesChange} name="heightInches" className="heightInches" min="0" max="11" />
                         </div> 
                         : 
                         <input type="number" value={this.state.heightInCm} onChange={this.heightInCm}name="heightInCm" className="heightInCm" min="0" max="250" />
                        }
                    </div>
                    <div className="inputwrap">
                        <label className="label">Age in years</label>
                        <input type="number" value={this.state.age} onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" />
                    </div>
                    <button onClick={() => this.calculateBMR()} type="button">Calculate BMR</button>
                    {resultBMR}
                    <div className="workout">
                        <div className="inputwrap">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" value={this.state.activity} onChange={this.handleActivityChange} name="activity">
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                            </select>
                        </div>
                        <button onClick={() => this.calculateCalories()} type="button">Calculate Calories</button>
                        {resultCalorie}
                    </div>
                </div>
            </div>
        )
    }
}

export default bmr;
