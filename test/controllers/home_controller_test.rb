require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "renders the home page" do
    get root_url

    assert_response :success
    assert_inertia_component "home/index"
    assert_inertia_props name: "World"
  end
end
