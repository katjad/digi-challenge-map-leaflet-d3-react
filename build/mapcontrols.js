var React = require('react');
var colours = require('../lib/colours');
var routes = require('../lib/routes');
var toggleLayer = require('../lib/leafFunc');
// var toggleLayer = require('../lib/d3Func');

var Controls = React.createClass({displayName: "Controls",
    getInitialState: function(){
        return {mapZoom: '11'}
    },
    handleUserInput: function(){
        this.setState({});
    },
    render: function(){
        return (
            React.createElement("span", null, 
                React.createElement("div", {id: "bike"}, 
                React.createElement(Long, null), 
                React.createElement(City, null)
                ), 
                React.createElement(Walks, null)
            )
            )
        
    }    
});


var Long = React.createClass({displayName: "Long",
    render: function(){
        var longroutes = routes.longrides;
        var listitems = longroutes.map(function(ride, index){
               return React.createElement(Item, {mode: "longride", ride: ride, itemId: index})
        })

        return (React.createElement("div", null, 
            React.createElement("div", {className: "bike"}, 
            
            React.createElement("h4", null, "Long Cycle Rides:"), 
            React.createElement("ul", {className: "side-nav", role: "navigation", title: "Link List"}, 
              listitems
            )
            )
            )
        )
    }
})


var City = React.createClass({displayName: "City",
    render: function(){
        var cityroutes = routes.cities;
        var listitems = cityroutes.map(function(ride, index){
     
               return React.createElement(Item, {mode: "cityride", ride: ride, itemId: index})

        })

        return (React.createElement("div", null, 
                React.createElement("div", {className: "bike"}, 
                
                React.createElement("h4", null, "City Rides:"), 
                React.createElement("ul", {className: "side-nav", role: "navigation", title: "Link List"}, 
                  listitems
                )
                )
               
            )
        )
    }
})

var Walks = React.createClass({displayName: "Walks",
      render: function(){
        var citywalks = routes.walks;
        var listitems = citywalks.map(function(ride, index){
           
              
               return React.createElement(Item, {mode: "walk", ride: ride, itemId: index})
      
        })

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "divider"}), 
                React.createElement("div", {id: "foot", className: "foot"}, 
                
                React.createElement("h3", null, "Walks:"), 
                React.createElement("ul", {className: "side-nav", role: "navigation", title: "Link List"}, 
                  listitems
                )
                )
            )
        )
    }

})

var Item = React.createClass({displayName: "Item",
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
        return React.createElement("li", {
          
            onClick: this.clickHandler, 
           
            mode: this.props.mode, 
            role: "menuitem", 
            style: {background: colour}}, 
            React.createElement("a", {href: "#"}, name)
        )
    }

}) 




module.exports = Controls;