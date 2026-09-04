require "application_system_test_case"

class HomeTest < ApplicationSystemTestCase
  test "renders the home page with the React frontend" do
    visit root_url

    assert_text "Hello, World!"
    assert_link "Read the Inertia Rails guide"
  end
end
