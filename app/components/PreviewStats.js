import React from "react";

export default class PreviewStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTime: [3, "po"],
      selectedSitch: [2, "5v5"],
      selectedCum: [0, ""],
      gameState: null,
    };

    this.regularPreview = this.regularPreview.bind(this);
    this.makeTwitMain = this.makeTwitMain.bind(this);
  }

  updateTime(selectedTime) {
    this.setState({
      selectedTime,
      error: null,
    });
  }

  updateSituation(selectedSitch) {
    this.setState({
      selectedSitch,
      error: null,
    });
  }

  updateCum(selectedCum) {
    this.setState({
      selectedCum,
      error: null,
    });
  }

  regularPreview() {
    this.setState({
      gameState: "Regular Preview",
    });
  }

  makeTwitMain(){
  	console.log('From PreviewStats makeTwitMain')
  	this.props.makeTwitMain()
  }

  render() {
    // console.log(this.fetchImage('https://www.naturalstattrick.com/graphs/teams/20192020/20192020-30221-po-cfdiff-5v5.png'));
    const { gameID } = this.props;
    const { selectedTime, selectedSitch, selectedCum, gameState } = this.state;
    const timeArray = [
      ["Full Season", "L82"],
      ["Last 25 Games", "L25"],
      ["Last 10 Games", "L10"],
      ["Playoffs", "po"],
    ];
    const situationsArray = [
      ["All", "all"],
      ["EV", "ev"],
      ["5v5", "5v5"],
      ["5v5 SVA", "sva"],
      ["5v4 PP", "5v4"],
      ["4v5 PK", "4v5"],
    ];
    const cumArray = [
      ["Cumulative", ""],
      ["Game Average", "-avg"],
    ];
    const url = `https://www.naturalstattrick.com/graphs/teams/20192020/20192020-${gameID
      .toString()
      .substring(5, 10)}-${selectedTime[1]}-cfdiff${selectedCum[1]}-${
      selectedSitch[1]
    }.png`;
    return (
      <React.Fragment>
      {gameState != "Regular Preview"
       ? <table>
          <tr>
            <td>
							<ul className="flex-center">
                {timeArray.map((time, index) => (
                  <li key={time}>
                    <button
                      className="btn-clear nav-link"
                      style={
                        index === selectedTime[0]
                          ? { color: "rgb(187, 46, 31)" }
                          : null
                      }
                      onClick={() => this.updateTime([index, time[1]])}
                    >
                      {time[0]}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="flex-center">
                {situationsArray.map((situation, index) => (
                  <li key={situation}>
                    <button
                      className="btn-clear nav-link"
                      style={
                        index === selectedSitch[0]
                          ? { color: "rgb(187, 46, 31)" }
                          : null
                      }
                      onClick={() =>
                        this.updateSituation([index, situation[1]])
                      }
                    >
                      {situation[0]}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="flex-center">
                {cumArray.map((cum, index) => (
                  <li key={cum}>
                    <button
                      className="btn-clear nav-link"
                      style={
                        index === selectedCum[0]
                          ? { color: "rgb(187, 46, 31)" }
                          : null
                      }
                      onClick={() => this.updateCum([index, cum[1]])}
                    >
                      {cum[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              	<img src={url} onError={() => this.regularPreview()} width='710' height='332'/>
            </td>
          </tr>
        </table>
        : this.makeTwitMain()}
      </React.Fragment>
    );
  }
}
