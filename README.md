# 474-PokemonVisualization

Using this data (pokemon.csv)Preview the document make a scatter plot of Sp. Def (x axis) vs Total (y axis). Use this Tableau visualization as a guide (Links to an external site.). Add two filters: one to filter data by generation and one to filter data by legendary pokemon. Your filter to show pokemon by generation should have the following fields:

(all)
1
2
3
4
5
6
Only one of these should be applied at a time.

 

Your filter for legendary pokemon should have the following fields: 

true
false
all
Again, you should only be able to select one value from this list at a time. You might want to implement this using a dropdown. Notice that a user should be able to select one value at a time from both tooltips. That means you must also handle the case where a user filters by generation and legendary. For example if a user selects 1 from generation and true for legendary you should show legendary pokemon in generation 1.

 

You should color the circles by Type1. You may want to use this map of pokemon types to color in your code (but you can also choose your own colors for each type as long as they are unique).

const colors = {

    "Bug": "#4E79A7",

    "Dark": "#A0CBE8",

    "Electric": "#F28E2B",

    "Fairy": "#FFBE&D",

    "Fighting": "#59A14F",

    "Fire": "#8CD17D",

    "Ghost": "#B6992D",

    "Grass": "#499894",

    "Ground": "#86BCB6",

    "Ice": "#86BCB6",

    "Normal": "#E15759",

    "Poison": "#FF9D9A",

    "Psychic": "#79706E",

    "Steel": "#BAB0AC",

    "Water": "#D37295"

}
You should show a legend of colors to Pokemon types, but you do not need to highlight a type when a user clicks on the legend.

 

When a user hovers over a point, they should see three fields:

The pokemon's name
The pokemon's first type
The pokemon's second type (if any)
 

You'll notice on Tableau that sometimes when you hover over a point you get a * for the pokemon name and/or type. This just means that there are multiple pokemon who have that exact Sp. Def and Total combination. You may choose to handle this case however you like as long as a tooltip still exists for these special points.

Upload your code to GitHub and set up a gh-pages website. Submit a link to your gh-pages site. 
