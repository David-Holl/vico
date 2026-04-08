import pytest

from packages.shared.base import Connector, ConnectorResponse


@pytest.mark.unit
def test_raises_error_with_no_implementation() -> None:
    class ConcreteNotImplemented(Connector):
        pass

    with pytest.raises(TypeError):
        ConcreteNotImplemented()


@pytest.mark.unit
def test_concrete_implemented_all_abstract_methods() -> None:
    class ConcreteImplemented(Connector):
        async def get_genre_data(
            self, identifier: str, tracking_id: str
        ) -> ConnectorResponse: ...

        async def get_source_data(
            self, identifier: str | list[str], tracking_id: str
        ) -> ConnectorResponse: ...

        async def get_video_data(
            self, identifier: str | list[str], tracking_id: str
        ) -> ConnectorResponse: ...

        async def search(self, query: str, tracking_id: str) -> ConnectorResponse: ...

    assert isinstance(ConcreteImplemented(), Connector)
