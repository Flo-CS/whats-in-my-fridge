import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";


import "./IngredientsAndAnalysis.scss";
import {isEmpty} from "lodash";
import {ReactComponent as InfoIcon} from "../../../../assets/icons/information.svg";

IngredientsAndAnalysis.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    ingredientsAnalysis: PropTypes.arrayOf(PropTypes.object).isRequired,

};

function IngredientsAndAnalysis({ingredients, ingredientsAnalysis}) {
    return <div className="ingredients-and-analysis">
        <ChipList>
            {ingredients.map(ingredient => {
                    return <Chip key={ingredient.key}>
                        <Chip.TextPart text={ingredient.name}/>
                        {!isEmpty(ingredient.infos) && <Chip.IconPart Icon={InfoIcon} variant="secondary"/>}
                    </Chip>;
                }
            )}
        </ChipList>
        <div className="ingredients-and-analysis__separation"/>
        <ChipList>
            {ingredientsAnalysis.map(ingredientAnalysis => {
                return <Chip key={ingredientAnalysis.key}>
                    <Chip.TextPart text={ingredientAnalysis.name}/>
                </Chip>;
                }
            )}
        </ChipList>
    </div>;
}

export default IngredientsAndAnalysis;