import React, { Component } from 'react';
import './App.css';
import Player from './Player/Player'
import Battle from './Battle'
import ToggleDisplay from 'react-toggle-display';
import Sound from 'react-sound';

class App extends Component {
constructor(props){
  super(props);
  this.state = {
    FirstPlayer: { id: "id1",
      name: "Select Player",
      hp: "0",
      strength: "0",
      action1: "",
      action2: "",
      image: {url: "/uploads/player/goggles.jpg"}
    },
    SecondPlayer: { id: "id2",
      name: "Select Player",
      hp: "0",
      strength: "0",
      action1: "",
      action2: "",
      image: {url: "/uploads/player/goggles.jpg"}
    },
    showBattle: false,
    show: true,
    showStats: false,
    sound: 'menu.mp3',
    play: 'PLAYING'
  }
  this._onButtonClick=  this._onButtonClick.bind(this)
  this.reset = this.reset.bind(this)
}

  togglePlayerHandler = (player) => {
    this.state.FirstPlayer.name === "Select Player" ? this.setState({FirstPlayer: player}) : this.setState({SecondPlayer: player})
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/players/players.json')
      .then(data => data.json())
      .then(data=> {
        this.setState({
          playerData: data
        })
      })
  }

  _onButtonClick(){
    this.setState({
      showBattle: true,
      show: !this.state.show,
      play: 'STOPPED'
    });
  }

  reset() {
    this.setState({
      FirstPlayer: { id: "id1",
        name: "Select Player",
        hp: "0",
        strength: "0",
        action1: "",
        action2: "",
        image: {url: "/uploads/player/goggles.jpg"}
      },
      SecondPlayer: { id: "id2",
        name: "Select Player",
        hp: "0",
        strength: "0",
        action1: "",
        action2: "",
        image: {url: "/uploads/player/goggles.jpg"}
      }
    })
  }

  render() {
    if (!this.state.playerData) {
      return <p>Loading Players...</p>
    } else {
      const listOfPlayers = this.state.playerData.map( player => {
        return <Player
          name = {player.name}
          image = {"http://localhost:4000" + player.image.url}
          click = {() => this.togglePlayerHandler(player)}
          key = {player.id}
          hp = {player.hp}
          strength = {player.strength}
           />
      });

      const PlayersChosen = [this.state.FirstPlayer, this.state.SecondPlayer]

      const SelectedPlayers = PlayersChosen.map( player => {

        return <Player

          name = {player.name}
         image = {"http://localhost:4000" + player.image.url}
            hp =  {player.hp}
      strength = {player.strength}
         showed = {player.hp}
           key = {player.id}
          />
      });

      const Music = <Sound url={"sounds/"+ this.state.sound} playStatus={this.state.play} loop='false'/>
      return (
        <div >


        <ul>
          <ToggleDisplay show={this.state.show}>

            <img class="title" src='images/Trangression.png' height="300px" width="500px"/>
            <img class="star" src='images/stars.png' height="100px" width="100px"/>
            <img class="star2" src='images/stars.png' height="50px" width="50px"/>
            <div class="character"> {listOfPlayers} </div><br></br>
            <div class="a"> {SelectedPlayers} </div><br></br>
            {Music}
            <div class="versus">
            {this.state.FirstPlayer.name + " vs " + this.state.SecondPlayer.name}
            </div>
            <br />
            <button class="fight" onClick={this._onButtonClick}> Fight </button>
            <button class="reset" onClick={this.reset}> Reset </button>
          </ToggleDisplay>

          {this.state.showBattle ? <Battle player1={this.state.FirstPlayer}
                                  player2={this.state.SecondPlayer}/> : null}
        </ul>
        </div>
      );
    }
  }
}

export default App;
