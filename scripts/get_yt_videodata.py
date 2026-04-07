import json
import os
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv()


class Config:
    BASE_URL = "https://www.googleapis.com/youtube/v3"
    API_KEY = ""
    JSON_DIR: Path
    CHANNELS: list[tuple[str, str]] = [
        ("70 Sekunden Wiki", "UC7EAEkE8U2eNMdJlXhdXpjA"),
        ("Indently", "UCuudpdbKmQWq2PPzYgVCWlA"),
        ("coldmirror", "UCDIDXF4WM1qQzerrxeEfSdA"),
        ("Simplicissimus", "UCKGMHVipEvuZudhHD05FOYA"),
        ("Fireship", "UCsBjURrPoezykLs9EqgamOA"),
        ("Ultralativ", "UCb-cM927p9tWkqmpOrBabOQ"),
        ("Tom Stanton", "UC67gfx2Fg7K2NSHqoENVgwA"),
        ("TERRA X History", "UCA3mpqm67CpJ13YfA8qAnow"),
        ("Nerdforge", "UCggHsHce2n3vvbJf_8YKrMA"),
        ("Quarks", "UC1Y7onDsPyfP-lu--SXF-ew"),
        ("Veritasium", "UCHnyfMqiRRG1u-2MsSQLbXA"),
        ("c't 3003", "UC1t9VFj-O6YUDPQxaVg-NkQ"),
        ("Maurice Weber", "UCFl1dGyjqh4w1pjFhAlamGg"),
        ("ARTEde", "UCLLibJTCy3sXjHLVaDimnpQ"),
    ]

    @classmethod
    def setup(cls) -> None:
        SCRIPT_DIR = Path(__file__).resolve().parent
        ROOT_DIR = SCRIPT_DIR.parent
        cls.JSON_DIR = Path.joinpath(
            ROOT_DIR, "apps", "web", "src", "data", "mock", "videos"
        )
        key = os.getenv("YT_TEST_KEY")
        cls.API_KEY = key if key else ""


def get_playlist_id(channel_id: str) -> str:
    if len(channel_id) != 24:
        raise ValueError("Channel ID must have 24 characters")
    return channel_id.replace("C", "U", 1)


def get_playlist_items(playlist_id: str, max_results: int = 50) -> dict[str, Any]:
    if len(playlist_id) != 24:
        raise ValueError("Channel ID must have 24 characters")
    if max_results > 50:
        raise ValueError("Pagination not implemented. Max Results: 50")
    PARAMS = {
        "playlistId": str(playlist_id),
        "part": "snippet",
        "maxResults": str(max_results),
        "key": Config.API_KEY,
    }
    response = requests.get(f"{Config.BASE_URL}/playlistItems", params=PARAMS)
    response.raise_for_status()
    return response.json()


def extract_video_id(response: dict[str, Any]) -> list[str]:
    found: list[str] = []
    items = response.get("items", list())
    for item in items:
        assert isinstance(item, dict)
        snippet = item.get("snippet", dict())
        assert isinstance(snippet, dict)
        resource_id = snippet.get("resourceId", dict())
        video_id = resource_id.get("videoId", "")
        if video_id:
            found.append(video_id)
    return found


def get_video_data(video_ids: list[str]) -> list[dict[str, Any]]:
    PARAMS = {
        "part": [
            "snippet",
            "paidProductPlacementDetails",
            "statistics",
            "status",
            "contentDetails",
        ],
        "id": video_ids,
        "key": Config.API_KEY,
    }
    response = requests.get(f"{Config.BASE_URL}/videos", params=PARAMS)
    response.raise_for_status()
    return response.json().get("items", [])


def main() -> None:
    Config.setup()
    youtube_videos: list[dict[str, Any]] = []
    for channel in Config.CHANNELS:
        channel_id = channel[1]
        playlist_id = get_playlist_id(channel_id)
        items = get_playlist_items(playlist_id)
        videos = extract_video_id(items)
        video_data = get_video_data(videos)
        youtube_videos.extend(video_data)
    assert Config.JSON_DIR
    with open(f"{Path.joinpath(Config.JSON_DIR, 'raw_yt_data.json')}", "w") as file:
        json.dump(youtube_videos, file, indent=4)


if __name__ == "__main__":
    main()
