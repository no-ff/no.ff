import requests


def get_prediction(query: str):
    """
    Get the prediction for a given query.

    Parameters:
        query (str): The query for which to get the prediction.

    Returns:
        str: The prediction for the given query.
    """
    url = f"http://142.198.94.28:5000/{query}"
    return requests.get(url).json()
