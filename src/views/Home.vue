<template>
<section class="container">
    <div class="main">
        <div class="nav">
            <div class="title">
                <h2>Weather App</h2>
            </div>
            <!--search -->
            <div class="links">
                <form method="post" @submit.prevent='getData'>

                    <input type="text" placeholder="Enter City" name="location" v-model="inputcity">
                    <label for="city"><button id='btn' type="submit" @click.prevent="getData" @submit.prevent><i class="fas fa-search"></i></button></label>

                </form>
            </div>
        </div>
        <div class="header">
            <div class="city-temp">
                <span> <i class="fas fa-city"></i></span>
                <h1 class="city">{{city}}</h1>

                <h1>Humidity: {{humidity}}</h1>
                <h1 >temperature: {{temp}}</h1>
                <h1>wind: {{wind}}</h1>
                <h1>Temperature difference: {{tempdiff}}</h1>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import axios from 'axios';

export default {

    components: {


    },
    name: 'app',
    data() {
        return {
            inputcity: '',
            town:'',

            latitude: '',
            longitude: '',
            weather: '',
            city: '',
            temperature: '',

            response: {
                wind: '',
                weather: '',
                Sys: {
                    sunrise: '',
                    Sunset: '',

                },
                visibility: '',

                clouds: '',

                humidity: '',

                timezone: '',

                feels_like: '',
                pressure: '',
                temp: '',
                temp_max: '',
                temp_min: '',
                tempdiff:'',

                name: ''

            }

        }
    },
 

    methods: {
        getData() {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.inputcity + '&appid=a28932c43feb23795fbff906b5bdef5b'
            axios.get(url).then((response) => {
                this.weather = response.data
                this.inputcity = ''
                this.city = response.data.name
                  

                        this.humidity = response.data.main.humidity
                        this.pressure = response.data.main.pressure
                        
                        this.temp = Math.floor (response.data.main.temp-273)

                        this.temp_maxp = response.data.main.temp_max
                        this.temp_min = response.data.main.temp_min
                        this.wind = response.data.wind.speed
                console.log(this.city)
            })
        },

        defaultlocation() {
              if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude
                this.longitude = position.coords.longitude

                const url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
                    this.latitude +
                    "&lon=" +
                    this.longitude +
                    "&appid=a28932c43feb23795fbff906b5bdef5b";

                    axios.get(url

                    ).then((res) => {
                        this.city = res.data.name

                        this.humidity = res.data.main.humidity
                        this.pressure = res.data.main.pressure
                        
                        this.temp = Math.floor (res.data.main.temp-273)
                        this.tempdiff =Math.floor( res.data.main.temp_max - res.data.main.temp_min)

                        this.temp_maxp = res.data.main.temp_max
                        this.temp_min = res.data.main.temp_min
                        this.wind = res.data.wind.speed

                        console.log(res.data)

                    })
                    //  console.log(this.weatherurlhour);

                }, () => {
                    this.city = "Nairobi"
                   this.getData();
                })

            } else {
                //  alert not available
            }



        }

    },
    mounted() {
        this.defaultlocation()
        
      

    },
    beforeMount() {

  


    },
    beforeCreate() {

    },

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh;
    background: url('~@/assets/Confetti-Doodles (1).svg');
    color: white;
    max-height: 100vh;
}

.city {
    font-size: 3em;

}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav {
    display: flex;
    height: 60px;

}

input {
    width: 200px;
    height: 30px;
    border-radius: 20px;
    margin: 0 10px;
    border: 1px solid black;
    outline: none;
    padding-left: 10px;
    color: black;
}

input:focus {
    color: black;
}

.nav {
    margin-top: 10px;
}

.fa-search {
    font-size: 1.5rem;
}

#btn {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
}
</style>
