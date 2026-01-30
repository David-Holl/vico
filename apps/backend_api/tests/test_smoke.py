import pytest

from apps.backend_api.smoke import smoke


@pytest.mark.unit
def test_smoke() -> None:
    assert smoke() is True
