from abc import ABC, abstractmethod
from typing import TypedDict


class ConnectorResponse(TypedDict):
    tracking_id: str
    json_string: str


class Connector(ABC):
    @abstractmethod
    async def get_video_data(
        self, identifier: str | list[str], tracking_id: str
    ) -> ConnectorResponse: ...

    @abstractmethod
    async def get_source_data(
        self, identifier: str | list[str], tracking_id: str
    ) -> ConnectorResponse: ...

    @abstractmethod
    async def get_genre_data(
        self, identifier: str, tracking_id: str
    ) -> ConnectorResponse: ...

    @abstractmethod
    async def search(self, query: str, tracking_id: str) -> ConnectorResponse: ...


def main() -> None: ...


if __name__ == "__main__":
    main()
