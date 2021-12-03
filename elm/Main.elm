module Main exposing (..)

import Browser
import Common.ImageOptionField as ImageOptionField
import Common.Mesures exposing (Ligne(..), TaillesRanges, centimetres, fromCentimetres)
import Common.Prix as Prix
import Common.Surface exposing (Surface)
import Elements.Essence as Essence exposing (Essence(..))
import Elements.Pietement as Pietement exposing (Position)
import Elements.Table as Table exposing (Table)
import Elements.Type as Type exposing (TableType)
import Form exposing (Form)
import Html exposing (Html, a, button, div, h2, i, input, label, li, p, span, text, ul)
import Html.Attributes exposing (class, classList, for, href, id, step, type_, value)
import Html.Events exposing (onClick, onInput)



-- MAIN


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type Step
    = Type
    | Essence
    | Surface
    | Pietement


type Model
    = Form Step Form
    | Estimation Table


formulaireVide =
    Form Type
        { type_ = Nothing
        , essence = Nothing
        , surface = Table.tableAManger.surface
        , pietement = Nothing
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( formulaireVide
    , Cmd.none
    )



-- UPDATE


type Msg
    = LongueurChanged String
    | LargeurChanged String
    | ValidateSurface
    | TableTypeChanged TableType
    | EssenceChanged Essence
    | PositionPietementChanged Position
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        Estimation _ ->
            ( formulaireVide, Cmd.none )

        Form step form ->
            case msg of
                LongueurChanged centimetres ->
                    ( fromCentimetres centimetres
                        |> Maybe.withDefault form.surface.longueur
                        |> Form.withLongueur form
                        |> Form step
                    , Cmd.none
                    )

                LargeurChanged centimetres ->
                    ( fromCentimetres centimetres
                        |> Maybe.withDefault form.surface.largeur
                        |> Form.withLargeur form
                        |> Form step
                    , Cmd.none
                    )

                TableTypeChanged tableType ->
                    ( Form.withType tableType form |> Form Essence, Cmd.none )

                EssenceChanged essence ->
                    ( { form | essence = Just essence } |> Form Surface, Cmd.none )

                PositionPietementChanged positionPietement ->
                    ( { form | pietement = Just positionPietement }
                        |> Form.toTable
                        |> Estimation
                    , Cmd.none
                    )

                ValidateSurface ->
                    ( form |> Form Pietement, Cmd.none )

                _ ->
                    ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Form step form ->
            div [ id "simulation" ]
                [ div [ class "workflow-links" ]
                    [ button [ classList [ ( "active", step == Type ) ] ] [ text "1. Format" ]
                    , button [ classList [ ( "active", step == Essence ) ] ] [ text "2. Essence" ]
                    , button [ classList [ ( "active", step == Surface ) ] ] [ text "3. Dimensions" ]
                    , button [ classList [ ( "active", step == Pietement ) ] ] [ text "4. Piétement" ]
                    , button [] [ text "5. Estimation" ]
                    ]
                , div [ id "workflow-content" ]
                    (case step of
                        Type ->
                            [ h2 [] [ text "Type de table" ]
                            , div [ class "radio-field" ]
                                (ImageOptionField.display
                                    { current = form.type_
                                    , onChange = TableTypeChanged
                                    }
                                    Type.fields
                                )
                            ]

                        Essence ->
                            [ h2 [] [ text "Essence de bois" ]
                            , div [ class "radio-field" ]
                                (ImageOptionField.display
                                    { current = form.essence
                                    , onChange = EssenceChanged
                                    }
                                    Essence.fields
                                )
                            ]

                        Surface ->
                            surfaceFields form.surface (Type.tailles (form.type_ |> Maybe.withDefault Type.AManger))

                        Pietement ->
                            [ h2 [] [ text "Type de pied" ]
                            , div [ class "radio-field" ]
                                (ImageOptionField.display
                                    { current = form.pietement
                                    , onChange = PositionPietementChanged
                                    }
                                    Pietement.fields
                                )
                            ]
                    )
                ]

        Estimation table ->
            div [ id "simulation" ]
                [ div [ class "workflow-links" ]
                    [ button [] [ text "1. Format" ]
                    , button [] [ text "2. Essence" ]
                    , button [] [ text "3. Dimensions" ]
                    , button [] [ text "4. Piétement" ]
                    , button [ class "active" ] [ text "5. Estimation" ]
                    ]
                , div [ id "workflow-content" ]
                    [ h2 [] [ text "Récapitulatif" ]
                    , ul []
                        (Table.recapitulatif table
                            |> List.map (\a -> [ text a ])
                            |> List.map (li [])
                        )
                    , h2 []
                        [ span
                            [ class "estimation" ]
                            [ text "Estimation" ]
                        , span
                            [ class "prix" ]
                            [ Table.prix table |> Prix.print |> text ]
                        ]
                    , p [] [ text "D'autres options sont disponibles." ]
                    , p []
                        [ text "Pour concevoir votre projet entièrement sur mesure et recevoir votre devis, "
                        , a [ href "mailto:tom@woodriver.fr" ] [ text "contactez-moi par mail." ]
                        ]
                    , div [ class "actions" ]
                        [ a [ class "call-to-action", href "mailto:tom@atelierwoodriver.fr" ]
                            [ i [ class "far fa-envelope" ] [], text "Demandez un devis !" ]
                        , button [ onClick Reset, class "discret" ] [ text "Relancer une estimation" ]
                        ]
                    ]
                ]


surfaceFields : Surface -> TaillesRanges -> List (Html Msg)
surfaceFields surface { largeurs, longueurs } =
    [ h2 [] [ text "Dimensions du plateau" ]
    , div [ class "range-field" ]
        [ label [ for "longueur" ] [ text <| "Longueur: " ++ (centimetres surface.longueur |> String.fromInt) ++ " cm" ]
        , input
            [ id "longueur"
            , type_ "range"
            , longueurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , longueurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres surface.longueur |> String.fromInt)
            , onInput LongueurChanged
            ]
            []
        ]
    , div [ class "range-field" ]
        [ label [ for "largeur" ] [ text <| "Largeur: " ++ (centimetres surface.largeur |> String.fromInt) ++ " cm" ]
        , input
            [ id "largeur"
            , type_ "range"
            , largeurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , largeurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres surface.largeur |> String.fromInt)
            , onInput LargeurChanged
            ]
            []
        ]
    , button [ onClick ValidateSurface ] [ text "Suivant >>" ]
    ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
