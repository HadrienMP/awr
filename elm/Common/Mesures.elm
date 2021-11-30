module Common.Mesures exposing (..)


type Ligne
    = Centimetre Int


type alias TaillesRanges =
    { largeurs : TailleRange, longueurs : TailleRange }


type alias TailleRange =
    { min : Ligne, max : Ligne }


fromCentimetres : String -> Maybe Ligne
fromCentimetres value =
    value |> String.toInt |> Maybe.map Centimetre


centimetres : Ligne -> Int
centimetres taille =
    case taille of
        Centimetre int ->
            int


type Surface
    = Centimetre2 Int
    | M2 Float


times : Ligne -> Ligne -> Surface
times a b =
    ( a, b )
        |> Tuple.mapBoth centimetres centimetres
        |> (\( largeur, longueur ) -> largeur * longueur)
        |> Centimetre2


m2 : Surface -> Float
m2 surface =
    case surface of
        Centimetre2 centimetre2 ->
            toFloat centimetre2 / 10000

        M2 float ->
            float
