module Main exposing (..)

import Browser
import Html exposing (Html, a, div, h2, i, img, input, label, p, span, strong, text)
import Html.Attributes exposing (alt, checked, class, classList, for, href, id, name, src, step, type_, value)
import Html.Events exposing (onCheck, onInput)
import Images exposing (tableAManger, tableBasse)



-- MAIN


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type TableType
    = Basse
    | AManger


type Essence
    = Chene
    | Chataignier
    | Frene
    | Noyer
    | Prestige
    | Exotique


type Prix
    = Euros Float


prixEssence : Table -> Prix
prixEssence table =
    case table.essence of
        Chene ->
            Euros 900

        Chataignier ->
            Euros 900

        Frene ->
            Euros 850

        Noyer ->
            Euros 950

        Prestige ->
            Euros 1000

        Exotique ->
            Euros 900


prixPietement : Table -> Prix
prixPietement table =
    case table.type_ of
        Basse ->
            case table.positionPietement of
                BoutDeTable ->
                    Euros 180

                Central ->
                    Euros 250

        AManger ->
            case table.positionPietement of
                BoutDeTable ->
                    Euros 250

                Central ->
                    Euros 500


type Taille
    = Centimetre Int


type PositionPietement
    = BoutDeTable
    | Central


type alias Table =
    { type_ : TableType
    , essence : Essence
    , longueur : Taille
    , largeur : Taille
    , positionPietement : PositionPietement
    }


init : () -> ( Table, Cmd Msg )
init _ =
    ( { type_ = AManger
      , essence = Chene
      , longueur = Centimetre 140
      , largeur = Centimetre 70
      , positionPietement = BoutDeTable
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = LongueurChanged String
    | LargeurChanged String
    | TableTypeChanged TableType
    | EssenceChanged Essence
    | PositionPietementChanged PositionPietement


update : Msg -> Table -> ( Table, Cmd Msg )
update msg table =
    case msg of
        LongueurChanged string ->
            let
                longueur =
                    string |> String.toInt |> Maybe.map Centimetre |> Maybe.withDefault table.longueur
            in
            ( { table | longueur = longueur }, Cmd.none )

        LargeurChanged string ->
            let
                largeur =
                    string |> String.toInt |> Maybe.map Centimetre |> Maybe.withDefault table.largeur
            in
            ( { table | largeur = largeur }, Cmd.none )

        TableTypeChanged tableType ->
            case tableType of
                Basse ->
                    ( { type_ = tableType
                      , essence = table.essence
                      , longueur = Centimetre 110
                      , largeur = Centimetre 50
                      , positionPietement = table.positionPietement
                      }
                    , Cmd.none
                    )

                AManger ->
                    ( { type_ = tableType
                      , essence = table.essence
                      , longueur = Centimetre 140
                      , largeur = Centimetre 70
                      , positionPietement = table.positionPietement
                      }
                    , Cmd.none
                    )

        EssenceChanged essence ->
            ( { table | essence = essence }, Cmd.none )

        PositionPietementChanged positionPietement ->
            ( { table | positionPietement = positionPietement }, Cmd.none )



-- VIEW


essences =
    [ Chene, Chataignier, Frene, Noyer, Prestige, Exotique ]


view : Table -> Html Msg
view table =
    div [ id "simulation-columns" ]
        [ div [ id "fields" ]
            ([ h2 [] [ text "Type" ]
             , div [ class "radio-field" ]
                ([ AManger, Basse ] |> List.map (tableTypeField table))
             , h2 [] [ text "Essence de bois" ]
             , div [ class "radio-field essence" ]
                (essences |> List.map (essenceField table))
             , h2 [] [ text "Taille du plateau" ]
             ]
                ++ (tailles table.type_ |> taillesFields table)
                ++ [ h2 [] [ text "Piétement" ]
                   , div [ class "radio-field" ]
                        ([ BoutDeTable, Central ] |> List.map (positionPietementField table))
                   ]
            )
        , div
            [ id "result" ]
            [ h2 [] [ text "Estimation" ]
            , p [ class "estimate" ] [ prixTotal table |> print |> text ]
            , p [] [ text "D'autres options sont disponibles." ]
            , p []
                [ text "Pour concevoir votre projet entièrement sur mesure et recevoir votre devis, "
                , a [ href "mailto:tom@woodriver.fr" ] [ text "contactez-moi par mail." ]
                ]
            ]
        ]


positionPietementField : Table -> PositionPietement -> Html Msg
positionPietementField table positionPietement =
    let
        ( fieldId, labelString, image ) =
            case positionPietement of
                BoutDeTable ->
                    ( "bout-de-table", "Bout de table", Images.boutDeTable )

                Central ->
                    ( "central", "Central", Images.central )

        selected =
            table.positionPietement == positionPietement
    in
    imageField fieldId selected labelString image (PositionPietementChanged positionPietement)


imageField fieldId selected labelString image event =
    label
        [ for fieldId ]
        [ p [ class "image-title", classList [ ( "selected", selected ) ] ] [ text labelString ]
        , img [ alt labelString, src image ] []
        , i [ class "fas fa-check-circle", classList [ ( "show", selected ) ] ] []
        , input
            [ type_ "radio"
            , id fieldId
            , name "essence"
            , checked selected
            , value fieldId
            , onCheck (\_ -> event)
            ]
            []
        ]


taillesFields : Table -> TaillesRanges -> List (Html Msg)
taillesFields table { largeurs, longueurs } =
    [ div [ class "range-field" ]
        [ label [ for "longueur" ] [ text <| "Longueur: " ++ (centimetres table.longueur |> String.fromInt) ]
        , input
            [ id "longueur"
            , type_ "range"
            , longueurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , longueurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres table.longueur |> String.fromInt)
            , onInput LongueurChanged
            ]
            []
        ]
    , div [ class "range-field" ]
        [ label [ for "largeur" ] [ text <| "Largeur: " ++ (centimetres table.largeur |> String.fromInt) ]
        , input
            [ id "largeur"
            , type_ "range"
            , largeurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , largeurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres table.largeur |> String.fromInt)
            , onInput LargeurChanged
            ]
            []
        ]
    ]


type alias TaillesRanges =
    { largeurs : TailleRange, longueurs : TailleRange }


type alias TailleRange =
    { min : Taille, max : Taille }


tailles : TableType -> TaillesRanges
tailles tableType =
    case tableType of
        Basse ->
            { largeurs = { min = Centimetre 50, max = Centimetre 300 }
            , longueurs = { min = Centimetre 50, max = Centimetre 300 }
            }

        AManger ->
            { largeurs = { min = Centimetre 65, max = Centimetre 600 }
            , longueurs = { min = Centimetre 65, max = Centimetre 600 }
            }


tableTypeField : Table -> TableType -> Html Msg
tableTypeField table tableType =
    let
        ( fieldId, labelString, image ) =
            case tableType of
                Basse ->
                    ( "basse", "Table basse", Images.tableBasse )

                AManger ->
                    ( "a-manger", "Table à manger", Images.tableAManger )
    in
    imageField fieldId (table.type_ == tableType) labelString image (TableTypeChanged tableType)


essenceField : Table -> Essence -> Html Msg
essenceField table essence =
    let
        ( fieldId, labelString, image ) =
            case essence of
                Chene ->
                    ( "chene", "Chêne", Images.chene )

                Chataignier ->
                    ( "chataignier", "Châtaignier", Images.chataignier )

                Frene ->
                    ( "frene", "Frêne", Images.frene )

                Noyer ->
                    ( "noyer", "Noyer", Images.noyer )

                Prestige ->
                    ( "prestige", "Prestige", Images.olivier )

                Exotique ->
                    ( "exotique", "Exotique", Images.bubinga )
    in
    imageField fieldId (table.essence == essence) labelString image (EssenceChanged essence)


surfaceM2 table =
    ( table.largeur, table.longueur )
        |> Tuple.mapBoth centimetres centimetres
        |> (\( largeur, longeur ) -> largeur * longeur)
        |> (\s -> toFloat s / 10000)


prixTotal : Table -> Prix
prixTotal table =
    prixEssence table
        |> times (surfaceM2 table)
        |> plus (prixPietement table)
        |> roundPrix


roundPrix : Prix -> Prix
roundPrix prix =
    case prix of
        Euros float ->
            float
                / 10
                |> round
                |> (*) 10
                |> toFloat
                |> Euros


plus : Prix -> Prix -> Prix
plus a b =
    case ( a, b ) of
        ( Euros a1, Euros b1 ) ->
            Euros <| a1 + b1


times : Float -> Prix -> Prix
times float prix =
    case prix of
        Euros euros ->
            Euros <| euros * float


print : Prix -> String
print prix =
    case prix of
        Euros int ->
            String.fromFloat int ++ " €"


centimetres : Taille -> Int
centimetres taille =
    case taille of
        Centimetre int ->
            int



-- SUBSCRIPTIONS


subscriptions : Table -> Sub Msg
subscriptions _ =
    Sub.none
