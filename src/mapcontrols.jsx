var React = require('react');
var colours = require('../lib/colours');
var routes = require('../lib/routes');
var toggleLayer = require('../lib/leafFunc');
// var toggleLayer = require('../lib/d3Func');

var Controls = React.createClass({
    getInitialState: function(){
        return {mapZoom: '11'}
    },
    handleUserInput: function(){
        this.setState({});
    },
    render: function(){
        return (
            <span>
                <div id="bike">
                <Long />
                <City />
                </div>
                <Walks />
            </span>
            )
        
    }    
});


var Long = React.createClass({
    render: function(){
        var longroutes = routes.longrides;
        var listitems = longroutes.map(function(ride, index){
               return <Item mode="longride" ride={ride} itemId={index} />
        })

        return (<div>
            <div className="bike">          
            
            <h4>Long Cycle Rides:</h4>
            <ul className="side-nav" role="navigation" title="Link List">       
              {listitems}
            </ul>
            </div>
            </div>
        )
    }
})


var City = React.createClass({
    render: function(){
        var cityroutes = routes.cities;
        var listitems = cityroutes.map(function(ride, index){
     
               return <Item mode="cityride" ride={ride} itemId={index} />

        })

        return (<div>
                <div className="bike">          
                
                <h4>City Rides:</h4>
                <ul className="side-nav" role="navigation" title="Link List">       
                  {listitems}
                </ul>
                </div>
               
            </div>
        )
    }
})

var Walks = React.createClass({
      render: function(){
        var citywalks = routes.walks;
        var listitems = citywalks.map(function(ride, index){
           
              
               return <Item mode="walk" ride={ride} itemId={index} />
      
        })

        return (
            <div>
                <div className="divider"></div>
                <div id="foot" className="foot">         
                
                <h3>Walks:</h3>
                <ul className="side-nav" role="navigation" title="Link List">       
                  {listitems}
                </ul>
                </div>
            </div>
        )
    }

})

var Item = React.createClass({
    getInitialState: function(){
        return {plotted: false}
    },
    clickHandler: function(){
        var id = this.props.itemId;
        var plotted = !this.state.plotted;
        var mode = this.props.mode;
        this.setState({plotted: plotted});
        toggleLayer(id, plotted, mode);
    },
    render: function(){
        var name = this.props.ride[0], colour = this.props.ride[1];
        var mode = this.props.mode
        return <li 
          
            onClick={this.clickHandler}
           
            mode={this.props.mode}
            role="menuitem" 
            style={{background: colour}}>
            <a href="#">{name}</a>
        </li>
    }

}) 




module.exports = Controls;