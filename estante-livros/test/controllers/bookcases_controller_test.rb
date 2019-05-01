require 'test_helper'

class BookcasesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bookcase = bookcases(:one)
  end

  test 'should get index' do
    get bookcases_url
    assert_response :success
  end

  test 'should get new' do
    get new_bookcase_url
    assert_response :success
  end

  test 'should create bookcase' do
    assert_difference('Bookcase.count') do
      post bookcases_url, params: { bookcase: { description: @bookcase.description, name: @bookcase.name, user_id: @bookcase.user_id } }
    end

    assert_redirected_to bookcase_url(Bookcase.last)
  end

  test 'should show bookcase' do
    get bookcase_url(@bookcase)
    assert_response :success
  end

  test 'should get edit' do
    get edit_bookcase_url(@bookcase)
    assert_response :success
  end

  test 'should update bookcase' do
    patch bookcase_url(@bookcase), params: { bookcase: { description: @bookcase.description, name: @bookcase.name, user_id: @bookcase.user_id } }
    assert_redirected_to bookcase_url(@bookcase)
  end

  test 'should destroy bookcase' do
    assert_difference('Bookcase.count', -1) do
      delete bookcase_url(@bookcase)
    end

    assert_redirected_to bookcases_url
  end
end
