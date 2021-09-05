import {capitalize, head, isEmpty, last} from "lodash";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ScoresBox from "../../components/data display/ScoresBox";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {fetchActiveProduct, selectActiveProduct} from "../../features/productSlice";
import {LETTER_SCORES_COLORS, NOVA_COLORS} from "../../helpers/constants";
import Additives from "./components/fields/Additives";
import Allergens from "./components/fields/Allergens";
import Categories from "./components/fields/Categories";
import IngredientsAndAnalysis from "./components/fields/IngredientsAndAnalysis";
import Labels from "./components/fields/Labels";
import NutritionalInformation from "./components/fields/NutritionalInformation";
import Origins from "./components/fields/Origins";
import ProductPageBody from "./components/ProductPageBody";
import ProductPageHeader from "./components/ProductPageHeader";
import "./ProductPage.scss";
import ProductPageField from "./components/ProductPageField";
import ProductPageFooter from "./components/ProductPageFooter";


export default function ProductPage() {
    const dispatch = useDispatch();
    const {barcode} = useParams();

    const product = useSelector(selectActiveProduct);
    const isLoading = useSelector(state => state.products.activeProductIsLoading) || barcode !== product.barcode; // It's necessary to test that the current loaded product is the product that the user requested to see before showing his data


    useEffect(() => {
        dispatch(fetchActiveProduct({barcode}));
    }, [barcode, dispatch]);


    let {
        quantity,
        image_url,
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
        name = "Nom inconnu",
        nutriscore,
        ecoscore,
        nova,
        size,
        nutrient_levels,
        nutriments,
        serving_size
    } = product || {};

    const brandsText = capitalize(brands.map(tag => tag.name).join(", "));

    const scoresBoxItems = [
        {
            name: "Nutriscore",
            value: nutriscore?.grade || "?",
            color: LETTER_SCORES_COLORS[nutriscore?.grade]
        },
        {
            name: "Ecoscore",
            value: ecoscore?.grade || "?",
            color: LETTER_SCORES_COLORS[ecoscore?.grade]
        },
        {
            name: "Nova",
            value: nova?.grade || "?",
            color: NOVA_COLORS[nova?.grade]
        }];

    const fields = [
        {
            title: "Informations nutritionnelles",
            component: <NutritionalInformation nutriments={nutriments}
                                               nutrientLevels={nutrient_levels}
                                               servingSize={serving_size}/>,
            isEmpty: isEmpty(nutriments)
        },
        {
            title: "Additifs",
            component: <Additives additives={additives}/>,
            isEmpty: isEmpty(additives)
        },
        {
            title: "Labels",
            component: <Labels labels={labels}/>,
            isEmpty: isEmpty(labels)
        },
        {
            title: "Ingrédients et analyse",
            component: <IngredientsAndAnalysis ingredients={ingredients} ingredientsAnalysis={ingredients_analysis}/>,
            isEmpty: isEmpty(ingredients)
        },
        {
            title: "Allergènes / intolérances",
            component: <Allergens allergens={allergens}/>,
            isEmpty: isEmpty(allergens)
        },
        {
            title: "Traces éventuelles",
            component: <Allergens allergens={traces}/>,
            isEmpty: isEmpty(traces)
        },
        {
            title: "Origines des ingrédients",
            component: <Origins origins={origins}/>,
            isEmpty: isEmpty(origins)
        },
        {
            title: "Pays de vente",
            component: <Origins origins={countries}/>,
            isEmpty: isEmpty(countries)
        },
        {
            title: "Catégories",
            component: <Categories categories={categories}/>,
            isEmpty: isEmpty(categories)
        }
    ]

    return <div className="product-page">
        {isLoading === false ? <>
                <ProductPageHeader barcode={barcode}
                                   name={name}
                                   brands={brandsText}
                                   size={size}
                                   imageUrl={image_url}
                                   quantity={quantity}/>
                <ProductPageBody>
                    <ScoresBox items={scoresBoxItems}/>
                    {fields.map(field => {
                        if (field.isEmpty) return null
                        return <ProductPageField key={field.title} title={field.title}>
                            {field.component}
                        </ProductPageField>
                    })}
                </ProductPageBody>
                <ProductPageFooter barcode={barcode} dateAdded={head(product.presences).date}
                                   modificationDate={last(product.presences).date}/>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
