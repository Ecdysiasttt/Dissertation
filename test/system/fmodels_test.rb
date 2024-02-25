require "application_system_test_case"

class FmodelsTest < ApplicationSystemTestCase
  setup do
    @fmodel = fmodels(:one)
  end

  test "visiting the index" do
    visit fmodels_url
    assert_selector "h1", text: "Fmodels"
  end

  test "should create fmodel" do
    visit fmodels_url
    click_on "New fmodel"

    fill_in "Title", with: @fmodel.title
    click_on "Create Fmodel"

    assert_text "Fmodel was successfully created"
    click_on "Back"
  end

  test "should update Fmodel" do
    visit fmodel_url(@fmodel)
    click_on "Edit this fmodel", match: :first

    fill_in "Title", with: @fmodel.title
    click_on "Update Fmodel"

    assert_text "Fmodel was successfully updated"
    click_on "Back"
  end

  test "should destroy Fmodel" do
    visit fmodel_url(@fmodel)
    click_on "Destroy this fmodel", match: :first

    assert_text "Fmodel was successfully destroyed"
  end
end
