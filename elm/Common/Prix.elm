module Common.Prix exposing (..)


type Prix
    = Euros Float


round : Prix -> Prix
round prix =
    case prix of
        Euros float ->
            float
                / 10
                |> Basics.round
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
