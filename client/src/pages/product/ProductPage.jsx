import {capitalize, isEmpty} from "lodash";
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
import ProductPageHeader from "./components/ProductPageHeader";
import "./ProductPage.scss";
import ProductPageField from "./components/ProductPageField";


export default function ProductPage() {
    const dispatch = useDispatch();
    const {barcode} = useParams();

    const product = useSelector(selectActiveProduct);
    const isLoading = useSelector(state => state.products.activeProductIsLoading) || barcode !== product.barcode; // It's necessary to test that the current loaded product is the product that the user requested to see before showing his data


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

    const fields = [
        {
            title: "Informations nutritionnelles",
            component: <NutritionalInformation nutriments={nutriments}
                                               nutrientLevels={nutrient_levels}
                                               servingSize={cleanedServingSize}/>,
            isEmpty: false
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
                <ProductPageHeader barcode={product.barcode}
                                   name={name}
                                   brands={brandsText}
                                   size={cleanedSize}
                                   imageUrl={image_small_url}
                                   quantity={product.quantity}/>
                <ProductPageBody>
                    <ScoresBox items={scoresBoxItems}/>

                    {fields.map(field => {
                        if (field.isEmpty) return null
                        return <ProductPageField key={field.title} title={field.title}>
                            {field.component}
                        </ProductPageField>
                    })}
                </ProductPageBody>
            </> :
            <ThreeDotLoading/>}

    </div>;

}
