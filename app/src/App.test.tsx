///@ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { Rule } from './App';
import { run as comments } from './modules/rules/comments'
import { run as usepackage } from './modules/rules/sortUsePackage'
import { readFileSync } from 'fs'

describe('Comments formatter', () => {
  describe('When there is one space', () => {
    it('nothing should change with a single line comment', () => {

      let code = "% This is a comment";
      expect(comments(code)).toBe(code);
    })
    it('nothing should change with a long single word comment', () => {

      let code = "% thisisaverylongcomment";
      expect(comments(code)).toBe(code);
    })
    it('nothing should change with code infront of the comment', () => {

      let code = "\\begin{thisonehasstufinfront} % This is a comment";
      expect(comments(code)).toBe(code);
    })
  })

  describe('When there is no space', () => {
    it('should add a space infront of the comment', () => {

      let code = "%This is a comment";
      expect(comments(code)).toBe("% This is a comment");
    })
    it('should add a space with a long single word comment', () => {

      let code = "%thisisaverylongcomment";
      expect(comments(code)).toBe("% thisisaverylongcomment");
    })
    it('should add a space with code infront of the comment', () => {

      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(comments(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })


  describe('When there more than one space', () => {
    it('should make a single space infront of the comment', () => {

      let code = "%        This is a comment";
      expect(comments(code)).toBe("% This is a comment");
    })
    it('tabs behind % should convert to space', () => {

      let code = "% thisisaverylongcomment";
      expect(comments(code)).toBe("% thisisaverylongcomment");
    })
    it('should make sure the % is sourrounded by spaces if there is text before the comment', () => {

      let code = "\\begin{thisonehasstufinfront}%This is a comment";
      expect(comments(code)).toBe("\\begin{thisonehasstufinfront} % This is a comment");
    })
  })
})


describe('Newline formatter', () => {
  describe('Sorts the rules in order', () => {
    it('sorts usepackage correctly', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/1a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/1b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
    it('does nothing with no imports', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/2a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/2b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
    it('removes spaces from imports', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/3a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/3b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
  })
})

describe('Usepackage formatter', () => {
  describe('Sorts the rules in order', () => {
    it('sorts usepackage correctly', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/1a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/1b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
    it('does nothing with no imports', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/2a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/2b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
  })
  describe('Spaces', () => {
    it('removes spaces from imports', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/3a.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/3b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
    it('removes spaces all from imports', () => {
      const code = readFileSync(__dirname + "/testFiles/usepackage/3c.tex", { flag: "r", encoding: "UTF-8" })
      const result = readFileSync(__dirname + "/testFiles/usepackage/3b.tex", { flag: "r", encoding: "UTF-8" })
      expect(usepackage(code)).toBe(result);
    })
  })
})