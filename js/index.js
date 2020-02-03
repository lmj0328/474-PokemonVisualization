"use strict";
(function(){
    let data = ""
    let svgContainer = ""
    const measurements = {
        width: 950,
        height: 600,
        marginAll: 50
    }
    const colors = {
        "Bug": "#4E79A7", "Dark": "#A0CBE8", "Electric": "#F28E2B", "Fairy": "#FFBEFD",
        "Fighting": "#59A14F", "Fire": "#8CD17D", "Ghost": "#B6992D", "Grass": "#499894",
        "Ground": "#86BCB6", "Ice": "#86BCB6", "Normal": "#E15759", "Poison": "#FF9D9A",
        "Psychic": "#79706E", "Steel": "#BAB0AC", "Water": "#D37295"
    }

    // load data and append svg to body
    svgContainer = d3.select('#viz').append("svg")
        .attr('width', measurements.width)
        .attr('height', measurements.height);
    d3.csv("pokemon.csv") // similar to fetch, but allows .csv files 
        .then((csvData) => {
            data = csvData; 
        })
        .then(() => makeScatterPlot());

    function makeScatterPlot() {
        /* initialize the plot */

        // add labels to side panel
        var colorsName = Object.keys(colors);
        var modifiedColors = [];
        for (let i = 0; i < colorsName.length; i++) {
            modifiedColors.push({"name": colorsName[i], "color": colors[colorsName[i]]});
        }

        var labels = d3.select('#pokemon-type-label')
            .selectAll(".div")
            .data(modifiedColors)
            .enter()
            
            .append("div")	
            .attr("class", "pokemon-label")	
            .html(function(d) {
                return "<div class=label style='background-color:" + d["color"] + "'></div> <div class='pokemon-name'>" + d["name"] + "</div>";
            })


        console.log(modifiedColors);
        console.log(colors)

        updateLegend(data);
        
        /* listeners for generation selector */
        d3.select('#pokemon-generation-selector')
            .on('change', function() {
                var generation = d3.select(this).property('value');
                var legendary = d3.select("#pokemon-legendary-selector").property('value');
                var filteredData = data;
                
                // filter by selected generation
                if (generation !== "all") {
                    filteredData = filteredData.filter(function (pokemon) {
                        return pokemon["Generation"] == generation;
                    });
                }

                // filter by selected legendary
                if (legendary !== "all") {
                    filteredData = filteredData.filter(function (pokemon) {
                        return pokemon["Legendary"] == legendary;
                    });
                }

                updateLegend(filteredData);
            });
        
        /* listeners for legendary selector */
        d3.select('#pokemon-legendary-selector')
            .on('change', function() {
                var legendary = d3.select(this).property('value');
                var generation = d3.select("#pokemon-generation-selector").property('value');
                var filteredData = data;
                
                // filter by selected generation
                if (generation !== "all") {
                    filteredData = filteredData.filter(function (pokemon) {
                        return pokemon["Generation"] == generation;
                    });
                }

                // filter by selected legendary
                if (legendary !== "all") {
                    filteredData = filteredData.filter(function (pokemon) {
                        return pokemon["Legendary"] == legendary;
                    });
                }

                updateLegend(filteredData);
            });

        /* append labels */
        svgContainer.append('text')
            .attr('x', measurements.width / 2 - 40)
            .attr('y', measurements.height - 10)
            .attr('fill', 'black')
            .text('Sp. Def')

        svgContainer.append('text')
            .attr('x', - measurements.height / 2 - 20)
            .attr('y', 12)
            .attr('fill', 'black')
            .attr('transform', "rotate(270)")
            .text('Total')

    }

    function updateLegend(data) {    
        let spDef = data.map((row) =>  parseFloat(row["Sp. Def"]));
        let total = data.map((row) => parseInt(row["Total"]));

        const limits = findMinMax(total, spDef)

        let scaleX = d3.scaleLinear()
            .domain([limits.spDefMin - 10, limits.spDefMax + 10])
            .range([0 + measurements.marginAll, measurements.width - measurements.marginAll])

        let scaleY = d3.scaleLinear()
            .domain([limits.totalMax + 50, limits.totalMin - 20]) 
            .range([0 + measurements.marginAll, measurements.height - measurements.marginAll])
        
        svgContainer.selectAll("g").remove()

        svgContainer.append('g') 
            .attr('transform', 'translate(0,550)')
            .call(d3.axisBottom(scaleX));

        svgContainer.append('g')
            .attr('transform', 'translate(50, 0)')
            .call(d3.axisLeft(scaleY));

        const xMap = function(d) { return scaleX(+d["Sp. Def"]) } // + make things into a number
        const yMap = function(d) { return scaleY(+d["Total"]) }   
    
        svgContainer.selectAll("div.tooltip").remove();
        var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0.5);

        svgContainer.selectAll("circle").remove();
        const circles = svgContainer.selectAll(".circle")
            .data(data)
            .enter()
            .append('circle')
                .attr('cx', xMap)
                .attr('cy', yMap)
                .attr('r', 5)
                .attr('fill', function(d) {
                    return colors[d["Type 1"]];
                })
                .on("mouseover", function(d) {		
                    div .transition()		
                        .duration(200)		
                        .style("opacity", 1);		
                    div	.html(d["Name"] + "<br/>" + "<br/>" + d["Type 1"] + "<br/>" + d["Type 2"])	
                        .style("left", (d3.event.pageX) + "px")		// mouse position
                        .style("top", (d3.event.pageY - 28) + "px");	
                    })					
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
        
        

        console.log("append");

    }

    function findMinMax(total, spDef) {
        return {
            totalMin: d3.min(total),
            totalMax: d3.max(total),
            spDefMin: d3.min(spDef),
            spDefMax: d3.max(spDef)
        }
    }

    

})()