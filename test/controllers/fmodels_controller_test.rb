require "test_helper"

class FmodelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fmodel = fmodels(:one)
  end

  test "should get index" do
    get fmodels_url
    assert_response :success
  end

  test "should get new" do
    get new_fmodel_url
    assert_response :success
  end

  test "should create fmodel" do
    assert_difference("Fmodel.count") do
      post fmodels_url, params: { fmodel: { title: @fmodel.title } }
    end

    assert_redirected_to fmodel_url(Fmodel.last)
  end

  test "should show fmodel" do
    get fmodel_url(@fmodel)
    assert_response :success
  end

  test "should get edit" do
    get edit_fmodel_url(@fmodel)
    assert_response :success
  end

  test "should update fmodel" do
    patch fmodel_url(@fmodel), params: { fmodel: { title: @fmodel.title } }
    assert_redirected_to fmodel_url(@fmodel)
  end

  test "should destroy fmodel" do
    assert_difference("Fmodel.count", -1) do
      delete fmodel_url(@fmodel)
    end

    assert_redirected_to fmodels_url
  end
end
