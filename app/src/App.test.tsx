import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Formatter } from './modules/formatter';



describe('Comments formatter', () => {
  describe('When there is one space', () => {
    it('nothing should change with a single line comment', () => {
      let formatter = new Formatter([], true);
      let code = "% This is a comment";
      expect(formatter.formatAll(code)).toBe(code);
    })
    it('nothing should change with a long single word comment', () => {
      let formatter = new Formatter([], true);
      let code = "% thisisaverylongcomment";
      expect(formatter.formatAll(code)).toBe(code);
    })
    it('nothing should change with code infront of the comment', () => {
      let formatter = new Formatter([], true);
      let code = "\\begin{thisonehasstufinfront} % This is a comment";
      expect(formatter.formatAll(code)).toBe(code);
    })
  })

  describe('When there is no space', () => {
    it('should add a space infront of the comment', () => {
      let formatter = new Formatter([], true);
      let code = "%This is a comment";
      expect(formatter.formatAll(code)).toBe("% This is a comment");
    })
    it('should add a space with a long single word comment', () => {
      let formatter = new Formatter([], true);
      let code = "%thisisaverylongcomment";
      expect(formatter.formatAll(code)).toBe("% thisisaverylongcomment");
    })
    it('should add a space with code infront of the comment', () => {
      let formatter = new Formatter([], true);
      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(formatter.formatAll(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })


  describe('When there more than one space', () => {
    it('should make a single space infront of the comment', () => {
      let formatter = new Formatter([], true);
      let code = "%        This is a comment";
      expect(formatter.formatAll(code)).toBe("% This is a comment");
    })
    it('tabs behind % should convert to space', () => {
      let formatter = new Formatter([], true);
      let code = "% thisisaverylongcomment";
      expect(formatter.formatAll(code)).toBe("% thisisaverylongcomment");
    })
    it('should make sure the % is sourrounded by spaces if there is text before the comment', () => {
      let formatter = new Formatter([], true);
      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(formatter.formatAll(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })





})