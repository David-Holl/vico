import json
import os
from pathlib import Path
from typing import Any, Literal

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


def get_playlist_id(
    channel_id: str, type: Literal["video", "short", "live", "all"] = "all"
) -> str:
    if len(channel_id) != 24:
        raise ValueError("Channel ID must have 24 characters")
    id = ""
    match type:
        case "all":
            id = channel_id.replace("UC", "UU", 1)
        case "short":
            id = channel_id.replace("UC", "UUSH", 1)
        case "video":
            id = channel_id.replace("UC", "UULF", 1)
        case "live":
            id = channel_id.replace("UC", "UULV", 1)
    return id


def get_playlist_items(playlist_id: str, max_results: int = 50) -> dict[str, Any]:
    if max_results > 50:
        raise ValueError("Pagination not implemented. Max Results: 50")
    PARAMS = {
        "playlistId": str(playlist_id),
        "part": "snippet",
        "maxResults": str(max_results),
        "key": Config.API_KEY,
    }
    response = requests.get(f"{Config.BASE_URL}/playlistItems", params=PARAMS)
    if response.status_code == 404:
        return dict()
    else:
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
    if not video_ids:
        return []
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
    if response.status_code == 404:
        return []
    else:
        response.raise_for_status()
    return response.json().get("items", [])


def main() -> None:
    Config.setup()
    youtube_videos: list[dict[str, Any]] = []
    youtube_shorts: list[dict[str, Any]] = []
    for channel in Config.CHANNELS:
        channel_id = channel[1]
        playlist_id_video = get_playlist_id(channel_id, "video")
        playlist_id_short = get_playlist_id(channel_id, "short")
        items_video = get_playlist_items(playlist_id_video)
        items_short = get_playlist_items(playlist_id_short)
        videos = extract_video_id(items_video)
        shorts = extract_video_id(items_short)
        video_data = get_video_data(videos)
        shorts_data = get_video_data(shorts)
        youtube_videos.extend(video_data)
        youtube_shorts.extend(shorts_data)
    assert Config.JSON_DIR
    with open(
        f"{Path.joinpath(Config.JSON_DIR, 'raw_yt_data_shorts.json')}", "w"
    ) as file:
        json.dump(youtube_shorts, file, indent=4)
    with open(
        f"{Path.joinpath(Config.JSON_DIR, 'raw_yt_data_videos.json')}", "w"
    ) as file:
        json.dump(youtube_videos, file, indent=4)


if __name__ == "__main__":
    main()
