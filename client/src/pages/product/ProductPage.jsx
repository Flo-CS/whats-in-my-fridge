import {capitalize} from "lodash";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ScoresBox from "../../components/data display/ScoresBox";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchActiveProduct, selectActiveProduct} from "../../features/productSlice";
import {LETTER_SCORES_COLORS, NOVA_COLORS, QUANTITY_REGEX} from "../../helpers/constants";
import {formatScore} from "../../helpers/miscellaneous";
import Additives from "./components/fields/Additives";
import Allergens from "./components/fields/Allergens";
import Categories from "./components/fields/Categories";
import IngredientsAndAnalysis from "./components/fields/IngredientsAndAnalysis";
import Labels from "./components/fields/Labels";
import NutritionalInformation from "./components/fields/NutritionalInformation";
import Origins from "./components/fields/Origins";
import ProductPageBody from "./components/ProductPageBody";
import ProductPageField from "./components/ProductPageField";
import ProductPageHeader from "./components/ProductPageHeader";
import "./ProductPage.scss";


export default function ProductPage() {
    const dispatch = useDispatch();
    const {barcode} = useParams();

    const product = useSelector(selectActiveProduct);
    const isLoading = useSelector(state => state.products.activeProductIsLoading);


    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);


    const {
        image_small_url,
        brands = [],
        additives = [],
        labels = [],
        ingredients = [],
        ingredients_analysis = [],
        allergens = [],
        traces = [],
        origins = [],
        countries = [],
        categories = [],
        product_name = "Nom inconnu",
        nutriscore_grade,
        ecoscore_grade,
        nova_group,
        quantity: size,
        nutrient_levels,
        nutriments,
        serving_size

    } = product.data || {};

    const nutriscore = formatScore(nutriscore_grade, true);
    const ecoscore = formatScore(ecoscore_grade, true);
    const nova = formatScore(nova_group);

    const brandsText = capitalize(brands.map(tag => tag.name).join(", "));
    const name = capitalize(product_name);

    const cleanedSize = size?.match(QUANTITY_REGEX)?.[0] || size;
    const cleanedServingSize = serving_size?.match(QUANTITY_REGEX)?.[0] || serving_size;

    const scoresBoxItems = [{
        name: "Nutriscore",
        value: nutriscore,
        color: LETTER_SCORES_COLORS[nutriscore]
    },
        {
            name: "Ecoscore",
            value: ecoscore,
            color: LETTER_SCORES_COLORS[ecoscore]
        },
        {
            name: "Nova",
            value: nova,
            color: NOVA_COLORS[nova]
        }];

    return <div className="product-page">
        {isLoading === false ? <>
                <ProductPageHeader barcode={product.barcode}
                                   name={name}
                                   brands={brandsText}
                                   size={cleanedSize}
                                   imageUrl={image_small_url}
                                   quantity={product.quantity}/>
                <ProductPageBody>
                    <ScoresBox items={scoresBoxItems}/>
                    <ProductPageField title="Informations nutritionnelles">
                        <NutritionalInformation nutriments={nutriments}
                                                nutrientLevels={nutrient_levels}
                                                servingSize={cleanedServingSize}/>
                    </ProductPageField>
                    <ProductPageField title="Additifs">
                        <Additives additives={additives}/>
                    </ProductPageField>
                    <ProductPageField title="Labels">
                        <Labels labels={labels}/>
                    </ProductPageField>
                    <ProductPageField title="Ingrédients et analyse">
                        <IngredientsAndAnalysis ingredients={ingredients} ingredientsAnalysis={ingredients_analysis}/>
                    </ProductPageField>
                    <ProductPageField title="Allergènes / intolérances">
                        <Allergens allergens={allergens}/>
                    </ProductPageField>
                    <ProductPageField title="Traces éventuelles">
                        <Allergens allergens={traces}/>
                    </ProductPageField>
                    <ProductPageField title="Origines des ingrédients">
                        <Origins origins={origins}/>
                    </ProductPageField>
                    <ProductPageField title="Pays de vente">
                        <Origins origins={countries}/>
                    </ProductPageField>
                    <ProductPageField title="Catégories">
                        <Categories categories={categories}/>
                    </ProductPageField>
                </ProductPageBody>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
